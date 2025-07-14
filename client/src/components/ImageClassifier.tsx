import React, { useState, useRef } from 'react';
import { Upload, Camera, X, CheckCircle, AlertCircle, Loader2, Info, Star, Leaf, Calendar, Package } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ClassificationResult {
    isMatch: boolean;
    confidence: number;
    detectedProduct: string;
    category: string;
    quality: {
        grade: string;
        freshness: number;
        defects: string[];
    };
    nutritionalInfo: {
        calories: number;
        vitamins: string[];
        minerals: string[];
    };
    marketInfo: {
        seasonality: string;
        storageRequirements: string;
        shelfLife: string;
    };
    suggestions: {
        pricing: string;
        presentation: string[];
        marketingTips: string[];
    };
    warnings: string[];
}

const GeminiImageClassifier: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [productName, setProductName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ClassificationResult | null>(null);
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const convertImageToBase64 = (imageUrl: string): string => {
        return imageUrl.split(',')[1];
    };

    const classifyImage = async () => {
        if (!selectedImage || !productName.trim() || !apiKey.trim()) {
            setError('Please provide an image, product name, and API key');
            return;
        }

        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            const base64Image = convertImageToBase64(selectedImage);

            const prompt = `
        Analyze this image of a farm product and provide a comprehensive classification and analysis.
        
        The farmer claims this is: "${productName}"
        
        Please provide a detailed JSON response with the following structure:
        {
          "isMatch": boolean, // whether the image matches the claimed product name
          "confidence": number, // confidence score 0-100
          "detectedProduct": "exact product name detected",
          "category": "fruit/vegetable/grain/herb/spice/nuts/etc",
          "quality": {
            "grade": "Premium/Good/Fair/Poor",
            "freshness": number, // 0-100 scale
            "defects": ["list of visible defects or issues"]
          },
          "nutritionalInfo": {
            "calories": number, // per 100g
            "vitamins": ["list of key vitamins"],
            "minerals": ["list of key minerals"]
          },
          "marketInfo": {
            "seasonality": "best growing/harvest season",
            "storageRequirements": "storage conditions",
            "shelfLife": "expected shelf life"
          },
          "suggestions": {
            "pricing": "pricing tier suggestion based on quality",
            "presentation": ["tips for better product presentation"],
            "marketingTips": ["marketing suggestions for this product"]
          },
          "warnings": ["any safety concerns, pesticide residue visible, etc"]
        }
        
        Be thorough in your analysis and provide actionable insights for the farmer selling this product.
        If the image doesn't match the claimed product name, explain what you actually see.
        Focus on practical information that would help in an online marketplace.
      `;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: prompt },
                            {
                                inline_data: {
                                    mime_type: "image/jpeg",
                                    data: base64Image
                                }
                            }
                        ]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const textResponse = data.candidates[0].content.parts[0].text;

            // Extract JSON from the response
            const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsedResult = JSON.parse(jsonMatch[0]);
                setResult(parsedResult);
            } else {
                throw new Error('Unable to parse JSON response from Gemini');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during classification');
        } finally {
            setIsLoading(false);
        }
    };

    const clearImage = () => {
        setSelectedImage(null);
        setResult(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getQualityColor = (grade: string) => {
        switch (grade.toLowerCase()) {
            case 'premium': return 'text-green-600';
            case 'good': return 'text-blue-600';
            case 'fair': return 'text-yellow-600';
            case 'poor': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className='h-screen overflow-y-auto'>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">🌱 Farm Product Classifier</h1>
                    <p className="text-gray-600">Upload product images to verify and get detailed analysis using AI</p>
                </div>

                {/* API Key Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gemini API Key
                    </label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your Gemini API key"
                    />
                </div>

                {/* Product Name Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name (as claimed by farmer)
                    </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Fresh Tomatoes, Organic Carrots, etc."
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Image
                    </label>
                    {!selectedImage ? (
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors"
                        >
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-600">Click to upload product image</p>
                            <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, GIF up to 10MB</p>
                        </div>
                    ) : (
                        <div className="relative">
                            <img
                                src={selectedImage}
                                alt="Selected product"
                                className="w-full max-w-md max-h-[300px] mx-auto rounded-lg shadow-md"
                            />
                            <button
                                onClick={clearImage}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                </div>

                {/* Analyze Button */}
                <button
                    onClick={classifyImage}
                    disabled={!selectedImage || !productName.trim() || !apiKey.trim() || isLoading}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <>
                            <Camera className="h-5 w-5" />
                            <span>Analyze Product</span>
                        </>
                    )}
                </button>

                {/* Error Display */}
                {error && (
                    <Alert className="mt-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Results Display */}
                {result && (
                    <div className="mt-6 space-y-6">
                        {/* Classification Result */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-4">
                                {result.isMatch ? (
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                ) : (
                                    <AlertCircle className="h-6 w-6 text-red-600" />
                                )}
                                <h3 className="text-lg font-semibold">
                                    {result.isMatch ? 'Product Verified ✓' : 'Product Mismatch ⚠️'}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Claimed Product:</p>
                                    <p className="font-semibold">{productName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Detected Product:</p>
                                    <p className="font-semibold">{result.detectedProduct}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Category:</p>
                                    <p className="font-semibold capitalize">{result.category}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Confidence:</p>
                                    <p className="font-semibold">{result.confidence}%</p>
                                </div>
                            </div>
                        </div>

                        {/* Quality Assessment */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-4">
                                <Star className="h-5 w-5 text-blue-600" />
                                <h3 className="text-lg font-semibold">Quality Assessment</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Grade:</p>
                                    <p className={`font-semibold ${getQualityColor(result.quality.grade)}`}>
                                        {result.quality.grade}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Freshness:</p>
                                    <p className="font-semibold">{result.quality.freshness}%</p>
                                </div>
                                {result.quality.defects.length > 0 && (
                                    <div className="md:col-span-2">
                                        <p className="text-sm text-gray-600">Defects:</p>
                                        <ul className="list-disc list-inside text-sm">
                                            {result.quality.defects.map((defect, index) => (
                                                <li key={index}>{defect}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Nutritional Information */}
                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-4">
                                <Leaf className="h-5 w-5 text-green-600" />
                                <h3 className="text-lg font-semibold">Nutritional Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Calories (per 100g):</p>
                                    <p className="font-semibold">{result.nutritionalInfo.calories}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Key Vitamins:</p>
                                    <p className="font-semibold">{result.nutritionalInfo.vitamins.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Key Minerals:</p>
                                    <p className="font-semibold">{result.nutritionalInfo.minerals.join(', ')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Market Information */}
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-4">
                                <Calendar className="h-5 w-5 text-yellow-600" />
                                <h3 className="text-lg font-semibold">Market Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Seasonality:</p>
                                    <p className="font-semibold">{result.marketInfo.seasonality}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Storage:</p>
                                    <p className="font-semibold">{result.marketInfo.storageRequirements}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Shelf Life:</p>
                                    <p className="font-semibold">{result.marketInfo.shelfLife}</p>
                                </div>
                            </div>
                        </div>

                        {/* Suggestions */}
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-4">
                                <Package className="h-5 w-5 text-purple-600" />
                                <h3 className="text-lg font-semibold">Seller Suggestions</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold">Pricing Tier:</p>
                                    <p>{result.suggestions.pricing}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold">Presentation Tips:</p>
                                    <ul className="list-disc list-inside text-sm">
                                        {result.suggestions.presentation.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-semibold">Marketing Tips:</p>
                                    <ul className="list-disc list-inside text-sm">
                                        {result.suggestions.marketingTips.map((tip, index) => (
                                            <li key={index}>{tip}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Warnings */}
                        {result.warnings.length > 0 && (
                            <div className="bg-red-50 p-4 rounded-lg">
                                <div className="flex items-center space-x-2 mb-4">
                                    <AlertCircle className="h-5 w-5 text-red-600" />
                                    <h3 className="text-lg font-semibold">Warnings</h3>
                                </div>
                                <ul className="list-disc list-inside text-sm">
                                    {result.warnings.map((warning, index) => (
                                        <li key={index}>{warning}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    );
};

export default GeminiImageClassifier;