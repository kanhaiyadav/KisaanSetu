import { Input } from "@/components/ui/input";
import DatePicker from "./DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormData, FormErrors } from '@/types/userProfile';

const PersonalInfoStep: React.FC<{
    formData: FormData;
    errors: FormErrors;
    onChange: (data: Partial<FormData>) => void;
}> = ({ formData, errors, onChange }) => {
    return (
        <div className="space-y-4">
            <div className='flex gap-2 space-y-2'>
                <div className="flex-1 flex flex-col gap-[5px]">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => onChange({ name: e.target.value })}
                        placeholder="Enter your full name"
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="!mt-0">
                    <DatePicker
                        value={formData.dateOfBirth}
                        onChange={(date) => onChange({ dateOfBirth: date })}
                        label="Date of birth"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="about" className="text-sm font-medium">About (Optional)</Label>
                <Textarea
                    id="about"
                    value={formData.about}
                    onChange={(e) => onChange({ about: e.target.value })}
                    placeholder="Tell us about yourself and your farming experience..."
                    rows={3}
                    className="resize-none"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="streetAddress" className="text-sm font-medium">Street Address</Label>
                <Input
                    id="streetAddress"
                    value={formData.address.streetAddress}
                    onChange={(e) => onChange({
                        address: { ...formData.address, streetAddress: e.target.value }
                    })}
                    placeholder="e.g., 123 Main St, Apt 4B"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                    <Input
                        id="city"
                        value={formData.address.city}
                        onChange={(e) => onChange({
                            address: { ...formData.address, city: e.target.value }
                        })}
                        placeholder="City"
                        className={errors.address?.city ? 'border-red-500' : ''}
                    />
                    {errors.address?.city && <p className="text-red-500 text-sm">{errors.address.city}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="postalCode" className="text-sm font-medium">Postal Code</Label>
                    <Input
                        id="postalCode"
                        value={formData.address.postalCode}
                        onChange={(e) => onChange({
                            address: { ...formData.address, postalCode: e.target.value }
                        })}
                        placeholder="Postal Code"
                    />
                    {errors.address?.postalCode && <p className="text-red-500 text-sm">{errors.address.postalCode}</p>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
                    <Input
                        id="country"
                        value={formData.address.country}
                        onChange={(e) => onChange({
                            address: { ...formData.address, country: e.target.value }
                        })}
                        placeholder="Country"
                        className={errors.address?.country ? 'border-red-500' : ''}
                    />
                    {errors.address?.country && <p className="text-red-500 text-sm">{errors.address.country}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm font-medium">State *</Label>
                    <Input
                        id="state"
                        value={formData.address.state}
                        onChange={(e) => onChange({
                            address: { ...formData.address, state: e.target.value }
                        })}
                        placeholder="State"
                        className={errors.address?.state ? 'border-red-500' : ''}
                    />
                    {errors.address?.state && <p className="text-red-500 text-sm">{errors.address.state}</p>}
                </div>
            </div>
        </div>
    );
};


export default PersonalInfoStep;