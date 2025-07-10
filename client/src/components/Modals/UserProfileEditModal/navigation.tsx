import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const FormNavigation: React.FC<{
    currentStep: number;
    totalSteps: number;
    onPrevious: () => void;
    onNext: () => void;
    onSubmit: () => void;
}> = ({ currentStep, totalSteps, onPrevious, onNext, onSubmit }) => {
    return (
        <div className="flex justify-between pt-6 border-t">
            <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep === 1}
            >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
                Previous
            </Button>

            {currentStep < totalSteps ? (
                <Button
                    onClick={onNext}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/80"
                >
                    Next
                    <ArrowRight className="w-4 h-4" />
                </Button>
            ) : (
                <Button
                    onClick={onSubmit}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/80"
                >
                    <Check className="w-4 h-4" />
                    Submit
                </Button>
            )}
        </div>
    );
    };

export default FormNavigation;