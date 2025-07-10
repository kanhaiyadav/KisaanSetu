import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const DatePicker: React.FC<{
    value?: Date;
    onChange: (date?: Date) => void;
    label: string;
    placeholder?: string;
}> = ({ value, onChange, label, placeholder = "Select date" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
                {label}
            </Label>
            <Popover open={isOpen} onOpenChange={setIsOpen} modal>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal text-gray-700"
                    >
                        {value ? value.toLocaleDateString() : placeholder}
                        <CalendarIcon className="size-3.5 text-gray-600" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        captionLayout='dropdown'
                        onSelect={(date) => {
                            onChange(date);
                            setIsOpen(false);
                        }}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DatePicker;