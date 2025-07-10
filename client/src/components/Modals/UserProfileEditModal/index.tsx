import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import FormNavigation from './navigation';
import ProgressSteps from './steps';
import PersonalInfoStep from './PersonalInfo';
import SocialInfoStep from './SocialStep';
import FarmDetailsStep from './FarmDetails';
import ReviewStep from './ReviewStep';
import { FormData, FormErrors } from '@/types/userProfile';

// Step Header Component
const StepHeader: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
    const steps = [
        { id: 1, title: 'Personal Info' },
        { id: 2, title: 'Social Information' },
        { id: 3, title: 'Farm Details' },
    ];

    return (
        <div className="text-center mb-2">
            <h3 className="text-lg font-semibold">{steps[currentStep - 1].title}</h3>
            <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
        </div>
    );
};


const FarmerProfileForm: React.FC<{ user?: any }> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        about: '',
        dateOfBirth: undefined,
        languages: [],
        address: {
            streetAddress: '',
            country: '',
            state: '',
            city: '',
            postalCode: ''
        },
        farm: {
            location: '',
            size: '',
            sizeUnit: 'acres',
            primaryCrops: []
        },
        socialMediaLinks: []
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const totalSteps = 3;

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                about: user.about || '',
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
                languages: user.languages || [],
                address: {
                    streetAddress: user.address?.streetAddress || '',
                    country: user.address?.country || '',
                    state: user.address?.state || '',
                    city: user.address?.city || '',
                    postalCode: user.address?.postalCode || ''
                },
                farm: {
                    location: user.farm?.location || '',
                    size: user.farm?.size || '',
                    sizeUnit: user.farm?.sizeUnit || 'acres',
                    primaryCrops: user.farm?.primaryCrops || []
                },
                socialMediaLinks: user.socialMediaLinks || []
            });
        }
    }, [user]);

    const validateStep = (step: number): boolean => {
        const newErrors: FormErrors = {};

        switch (step) {
            case 1:
                if (!formData.name.trim()) {
                    newErrors.name = 'Name is required';
                }
                if (!formData.address.country.trim()) {
                    newErrors.address = { ...newErrors.address, country: 'Country is required' };
                }
                if (!formData.address.state.trim()) {
                    newErrors.address = { ...newErrors.address, state: 'State is required' };
                }
                if (!formData.address.city.trim()) {
                    newErrors.address = { ...newErrors.address, city: 'City is required' };
                }
                if (!formData.address.postalCode.trim()) {
                    newErrors.address = { ...newErrors.address, postalCode: 'Postal/Pin code is required' };
                }
                if (!formData.address.streetAddress.trim()) {
                    newErrors.address = { ...newErrors.address, streetAddress: 'Street address or Landmark is required' };
                }
                break;
            case 2:
                if (formData.languages.length <= 0) {
                    newErrors.languages = 'At least one language is required';
                }
                break;
            case 3:
                if (!formData.farm.location.trim()) {
                    newErrors.farm = { ...newErrors.farm, location: 'Farm location is required' };
                }
                if (!formData.farm.size.trim()) {
                    newErrors.farm = { ...newErrors.farm, size: 'Farm size is required' };
                }
                if (formData.farm.primaryCrops.length === 0) {
                    newErrors.farm = { ...newErrors.farm, primaryCrops: 'At least one crop is required' };
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        console.log('Form submitted:', formData);
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users?email=${user?.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
             userData: formData
            })
        })
        setIsOpen(false);
        setCurrentStep(1);
        setFormData(formData);
    };

    const handleFormDataChange = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PersonalInfoStep
                        formData={formData}
                        errors={errors}
                        onChange={handleFormDataChange}
                    />
                );
            case 2:
                return (
                    <SocialInfoStep
                        formData={formData}
                        errors={errors}
                        onChange={handleFormDataChange}
                    />
                );
            case 3:
                return (
                    <FarmDetailsStep
                        formData={formData}
                        errors={errors}
                        onChange={handleFormDataChange}
                    />
                );
            // case 4:
            //     return <ReviewStep formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="lg" className='mt-[-5px]'>
                    Update profile info
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] h-[90vh] flex flex-col">
                <DialogHeader className='hidden'>
                    <DialogTitle className="text-2xl font-bold text-center">
                        Farmer Profile Update Form
                    </DialogTitle>
                </DialogHeader>

                <ProgressSteps currentStep={currentStep} />
                <StepHeader currentStep={currentStep} totalSteps={totalSteps} />

                <div className="flex-1 min-h-0 overflow-y-auto thin-scrollbar px-1 pr-2 mr-[-5px] pb-2">
                    {renderStep()}
                </div>

                <FormNavigation
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
};

export default FarmerProfileForm;