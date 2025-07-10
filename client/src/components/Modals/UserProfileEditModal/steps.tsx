import { Check, Globe, Tractor, User } from "lucide-react";

const ProgressSteps: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = [
        { id: 1, title: 'Personal Info', icon: User },
        { id: 2, title: 'Social Information', icon: Globe },
        { id: 3, title: 'Farm Details', icon: Tractor },
    ];

    return (
        <div className="flex justify-center items-center mb-6">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    <div className={`
                        flex items-center justify-center w-10 h-10 rounded-full border-2 
                        ${currentStep >= step.id
                            ? 'bg-primary border-primary text-white'
                            : 'border-gray-300 text-gray-600'
                        }
                    `}>
                        <step.icon className="w-4 h-4" />
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`
                            w-16 h-1 mx-2
                            ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}
                        `} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressSteps;