import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TagInput from './TagInput';
import { FormData, FormErrors } from '@/types/userProfile';


const FarmDetailsStep: React.FC<{
    formData: FormData;
    errors: FormErrors;
    onChange: (data: Partial<FormData>) => void;
}> = ({ formData, errors, onChange }) => {
    const handleAddCrop = (crop: string) => {
        onChange({
            farm: {
                ...formData.farm,
                primaryCrops: [...formData.farm.primaryCrops, crop]
            }
        });
    };

    const handleRemoveCrop = (crop: string) => {
        onChange({
            farm: {
                ...formData.farm,
                primaryCrops: formData.farm.primaryCrops.filter(c => c !== crop)
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="farmLocation" className="text-sm font-medium">Farm Location *</Label>
                <Input
                    id="farmLocation"
                    value={formData.farm.location}
                    onChange={(e) => onChange({
                        farm: { ...formData.farm, location: e.target.value }
                    })}
                    placeholder="Farm location or nearest landmark"
                    className={errors.farm?.location ? 'border-red-500' : ''}
                />
                {errors.farm?.location && <p className="text-red-500 text-sm">{errors.farm.location}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="farmSize" className="text-sm font-medium">Farm Size *</Label>
                    <Input
                        id="farmSize"
                        type="number"
                        value={formData.farm.size}
                        onChange={(e) => onChange({
                            farm: { ...formData.farm, size: e.target.value }
                        })}
                        placeholder="Size"
                        className={errors.farm?.size ? 'border-red-500' : ''}
                    />
                    {errors.farm?.size && <p className="text-red-500 text-sm">{errors.farm.size}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="sizeUnit" className="text-sm font-medium">Unit</Label>
                    <Select
                        value={formData.farm.sizeUnit}
                        onValueChange={(value: 'acres' | 'hectares' | 'sqft' | 'sqm') =>
                            onChange({
                                farm: { ...formData.farm, sizeUnit: value }
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="acres">Acres</SelectItem>
                            <SelectItem value="hectares">Hectares</SelectItem>
                            <SelectItem value="sqft">Square Feet</SelectItem>
                            <SelectItem value="sqm">Square Meters</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <TagInput
                label="Primary Crops *"
                placeholder="Add a crop"
                tags={formData.farm.primaryCrops}
                onAdd={handleAddCrop}
                onRemove={handleRemoveCrop}
                error={errors.farm?.primaryCrops}
            />
        </div>
    );
};

export default FarmDetailsStep;