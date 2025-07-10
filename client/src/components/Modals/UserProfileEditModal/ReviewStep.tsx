import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Tractor, User } from 'lucide-react';
import { FormData} from '@/types/userProfile';


const ReviewStep: React.FC<{ formData: FormData }> = ({ formData }) => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p><strong>Name:</strong> {formData.name}</p>
                        {formData.dateOfBirth && (
                            <p><strong>Date of Birth:</strong> {formData.dateOfBirth.toLocaleDateString()}</p>
                        )}
                        {formData.about && <p><strong>About:</strong> {formData.about}</p>}
                        {formData.languages.length > 0 && (
                            <div>
                                <strong>Languages:</strong>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {formData.languages.map((lang) => (
                                        <Badge key={lang} variant="secondary">{lang}</Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        Address
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p><strong>Country:</strong> {formData.address.country}</p>
                        <p><strong>State:</strong> {formData.address.state}</p>
                        <p><strong>City:</strong> {formData.address.city}</p>
                        {formData.address.postalCode && (
                            <p><strong>Postal Code:</strong> {formData.address.postalCode}</p>
                        )}
                        {formData.address.streetAddress && (
                            <p><strong>Street Address:</strong> {formData.address.streetAddress}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Tractor className="w-5 h-5" />
                        Farm Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <p><strong>Location:</strong> {formData.farm.location}</p>
                        <p><strong>Size:</strong> {formData.farm.size} {formData.farm.sizeUnit}</p>
                        <div>
                            <strong>Primary Crops:</strong>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {formData.farm.primaryCrops.map((crop) => (
                                    <Badge key={crop} variant="secondary">{crop}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReviewStep;