import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FaUser, FaMapMarkerAlt, FaSeedling, FaPlus, FaTimes, FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Address {
    country: string;
    state: string;
    city: string;
    fullAddress: string;
}

interface Farm {
    location: string;
    size: string;
    sizeUnit: string;
    primaryCrops: string[];
}

interface FormData {
    name: string;
    about: string;
    address: Address;
    farm: Farm;
}

const FarmerProfileForm = () => {
    const [open, setOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [currentCrop, setCurrentCrop] = useState('');
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const totalSteps = 3;

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        trigger,
        reset
    } = useForm<FormData>({
        defaultValues: {
            name: '',
            about: '',
            address: {
                country: '',
                state: '',
                city: '',
                fullAddress: ''
            },
            farm: {
                location: '',
                size: '',
                sizeUnit: '',
                primaryCrops: []
            }
        },
        mode: 'onChange'
    });

    const watchedCrops = watch('farm.primaryCrops');
    const progress = (currentStep / totalSteps) * 100;

    const addCrop = () => {
        if (currentCrop.trim() && !watchedCrops.includes(currentCrop.trim())) {
            setValue('farm.primaryCrops', [...watchedCrops, currentCrop.trim()]);
            setCurrentCrop('');
        }
    };

    const removeCrop = (cropToRemove: string) => {
        setValue('farm.primaryCrops', watchedCrops.filter(crop => crop !== cropToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCrop();
        }
    };

    const nextStep = async () => {
        let fieldsToValidate: (keyof FormData)[] = [];

        switch (currentStep) {
            case 1:
                fieldsToValidate = ['name', 'about'];
                break;
            case 2:
                fieldsToValidate = ['address'];
                break;
            case 3:
                fieldsToValidate = ['farm'];
                break;
        }

        const isStepValid = await trigger(fieldsToValidate);

        if (isStepValid && currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        setOpen(false);
        reset();
        setCurrentStep(1);
        setCurrentCrop('');
    };

    const handleDialogClose = () => {
        setOpen(false);
        reset();
        setCurrentStep(1);
        setCurrentCrop('');
    };

    const detectLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }

        setIsDetectingLocation(true);
        toast.loading('Detecting your location...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    if (data.error) {
                        throw new Error(data.error);
                    }

                    setValue('address.country', data.address.country || '', { shouldValidate: true });
                    setValue('address.state', data.address.state || data.address.county || '', { shouldValidate: true });
                    setValue('address.city', data.address.city || data.address.town || data.address.village || '', { shouldValidate: true });
                    setValue('address.fullAddress', data.display_name || '', { shouldValidate: true });

                    // Also set farm location if it's empty
                    if (!watch('farm.location')) {
                        setValue('farm.location', data.display_name || '', { shouldValidate: true });
                    }

                    toast.success('Location detected successfully!');
                } catch (error) {
                    toast.error('Failed to fetch address details');
                    console.error('Geocoding error:', error);
                } finally {
                    setIsDetectingLocation(false);
                }
            },
            (error) => {
                setIsDetectingLocation(false);
                toast.error('Failed to detect location. Please enable location services.');
                console.error('Geolocation error:', error);
            }
        );
    };

    const getStepIcon = (step: number) => {
        if (step < currentStep) return <FaCheck className="w-4 h-4 text-white" />;
        if (step === currentStep) return <span className="text-white font-semibold">{step}</span>;
        return <span className="text-gray-400 font-semibold">{step}</span>;
    };

    const getStepColor = (step: number) => {
        if (step < currentStep) return 'bg-green-500';
        if (step === currentStep) return 'bg-blue-500';
        return 'bg-gray-300';
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-200 shadow-sm">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-green-100 rounded-full mr-4">
                                    <FaUser className="text-green-600 text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Full Name *
                                    </Label>
                                    <Controller
                                        name="name"
                                        control={control}
                                        rules={{
                                            required: 'Full name is required',
                                            minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                        }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="name"
                                                placeholder="Enter your full name"
                                                className={`mt-1 h-12 text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="about" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        About Yourself
                                    </Label>
                                    <Controller
                                        name="about"
                                        control={control}
                                        rules={{
                                            maxLength: { value: 500, message: 'Description must be less than 500 characters' }
                                        }}
                                        render={({ field }) => (
                                            <Textarea
                                                {...field}
                                                id="about"
                                                placeholder="Tell us about yourself and your farming journey..."
                                                className={`mt-1 min-h-[120px] text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.about ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                rows={5}
                                            />
                                        )}
                                    />
                                    {errors.about && (
                                        <p className="text-red-500 text-sm mt-1">{errors.about.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl border border-blue-200 shadow-sm">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-blue-100 rounded-full mr-4">
                                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Address Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="country" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Country *
                                    </Label>
                                    <Controller
                                        name="address.country"
                                        control={control}
                                        rules={{ required: 'Country is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="country"
                                                placeholder="Enter your country"
                                                className={`mt-1 h-12 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address?.country ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        )}
                                    />
                                    {errors.address?.country && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address.country.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="state" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        State/Province *
                                    </Label>
                                    <Controller
                                        name="address.state"
                                        control={control}
                                        rules={{ required: 'State/Province is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="state"
                                                placeholder="Enter your state"
                                                className={`mt-1 h-12 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address?.state ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        )}
                                    />
                                    {errors.address?.state && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address.state.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="city" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        City *
                                    </Label>
                                    <Controller
                                        name="address.city"
                                        control={control}
                                        rules={{ required: 'City is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="city"
                                                placeholder="Enter your city"
                                                className={`mt-1 h-12 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address?.city ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        )}
                                    />
                                    {errors.address?.city && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="fullAddress" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Full Address *
                                    </Label>
                                    <Controller
                                        name="address.fullAddress"
                                        control={control}
                                        rules={{ required: 'Full address is required' }}
                                        render={({ field }) => (
                                            <Textarea
                                                {...field}
                                                id="fullAddress"
                                                placeholder="Enter your complete address"
                                                className={`mt-1 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address?.fullAddress ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                                rows={3}
                                            />
                                        )}
                                    />
                                    {errors.address?.fullAddress && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address.fullAddress.message}</p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <Button
                                        type="button"
                                        onClick={detectLocation}
                                        disabled={isDetectingLocation}
                                        variant="outline"
                                        className="w-full mt-4 py-3 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                                    >
                                        <FaMapMarkerAlt className="mr-2" />
                                        {isDetectingLocation ? 'Detecting Location...' : 'Auto-detect My Location'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-xl border border-amber-200 shadow-sm">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-amber-100 rounded-full mr-4">
                                    <FaSeedling className="text-amber-600 text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800">Farm Information</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="farmLocation" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Farm Location *
                                    </Label>
                                    <Controller
                                        name="farm.location"
                                        control={control}
                                        rules={{ required: 'Farm location is required' }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                id="farmLocation"
                                                placeholder="Enter your farm location"
                                                className={`mt-1 h-12 text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.farm?.location ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                        )}
                                    />
                                    {errors.farm?.location && (
                                        <p className="text-red-500 text-sm mt-1">{errors.farm.location.message}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="farmSize" className="text-sm font-semibold text-gray-700 mb-2 block">
                                            Farm Size *
                                        </Label>
                                        <Controller
                                            name="farm.size"
                                            control={control}
                                            rules={{
                                                required: 'Farm size is required',
                                                pattern: { value: /^\d+(\.\d+)?$/, message: 'Please enter a valid number' }
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="farmSize"
                                                    placeholder="Enter farm size"
                                                    className={`mt-1 h-12 text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.farm?.size ? 'border-red-500' : 'border-gray-300'
                                                        }`}
                                                    type="number"
                                                    step="0.01"
                                                />
                                            )}
                                        />
                                        {errors.farm?.size && (
                                            <p className="text-red-500 text-sm mt-1">{errors.farm.size.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="sizeUnit" className="text-sm font-semibold text-gray-700 mb-2 block">
                                            Size Unit *
                                        </Label>
                                        <Controller
                                            name="farm.sizeUnit"
                                            control={control}
                                            rules={{ required: 'Size unit is required' }}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className={`mt-1 h-12 text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${errors.farm?.sizeUnit ? 'border-red-500' : 'border-gray-300'
                                                        }`}>
                                                        <SelectValue placeholder="Select unit" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="acres">Acres</SelectItem>
                                                        <SelectItem value="hectares">Hectares</SelectItem>
                                                        <SelectItem value="sqft">Square Feet</SelectItem>
                                                        <SelectItem value="sqm">Square Meters</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.farm?.sizeUnit && (
                                            <p className="text-red-500 text-sm mt-1">{errors.farm.sizeUnit.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="primaryCrops" className="text-sm font-semibold text-gray-700 mb-2 block">
                                        Primary Crops
                                    </Label>
                                    <div className="flex gap-3 mt-1">
                                        <Input
                                            id="primaryCrops"
                                            value={currentCrop}
                                            onChange={(e) => setCurrentCrop(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Enter crop name and press Enter"
                                            className="flex-1 h-12 text-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                                        />
                                        <Button
                                            type="button"
                                            onClick={addCrop}
                                            size="lg"
                                            className="bg-amber-600 hover:bg-amber-700 text-white px-6"
                                        >
                                            <FaPlus className="mr-2" />
                                            Add
                                        </Button>
                                    </div>

                                    {watchedCrops.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            {watchedCrops.map((crop, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="bg-amber-100 text-amber-800 hover:bg-amber-200 cursor-pointer px-3 py-1 text-sm"
                                                    onClick={() => removeCrop(crop)}
                                                >
                                                    {crop}
                                                    <FaTimes className="ml-2 h-3 w-3" />
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Dialog open={open}>
            <DialogTrigger
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
                onClick={() => setOpen(true)}
            >
                    <FaUser className="mr-3" />
                    Create Farmer Profile
            </DialogTrigger>

            <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center text-gray-800 mb-4">
                        🌾 Farmer Profile Registration
                    </DialogTitle>

                    {/* Progress Bar */}
                    <div className="space-y-4">
                        <Progress value={progress} className="w-full h-2" />

                        {/* Step Indicators */}
                        <div className="flex justify-between items-center">
                            {[1, 2, 3].map((step) => (
                                <div key={step} className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getStepColor(step)} ${step === currentStep ? 'border-blue-500' : 'border-gray-300'
                                        }`}>
                                        {getStepIcon(step)}
                                    </div>
                                    <span className={`ml-2 font-medium ${step === currentStep ? 'text-blue-600' : 'text-gray-500'
                                        }`}>
                                        {step === 1 ? 'Personal' : step === 2 ? 'Address' : 'Farm'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className="px-6 py-3 text-lg font-medium"
                        >
                            <FaArrowLeft className="mr-2" />
                            Previous
                        </Button>

                        <div className="flex gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleDialogClose}
                                className="px-6 py-3 text-lg font-medium"
                            >
                                Cancel
                            </Button>

                            {currentStep < totalSteps ? (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Next
                                    <FaArrowRight className="ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={handleSubmit(onSubmit)}
                                    className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <FaCheck className="mr-2" />
                                    Create Profile
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FarmerProfileForm;