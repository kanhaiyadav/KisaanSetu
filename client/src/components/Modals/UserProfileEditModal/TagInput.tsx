import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const TagInput: React.FC<{
    label: string;
    placeholder: string;
    tags: string[];
    onAdd: (tag: string) => void;
    onRemove: (tag: string) => void;
    error?: string;
}> = ({ label, placeholder, tags, onAdd, onRemove, error }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAdd = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            onAdd(inputValue.trim());
            setInputValue('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            <div className="flex gap-2">
                <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={placeholder}
                    onKeyPress={handleKeyPress}
                />
                <Button type="button" onClick={handleAdd} size="icon">
                    <Plus size={16} />
                </Button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-2 py-1 flex items-center gap-1">
                        {tag}
                        <X
                            className="w-3 h-3 cursor-pointer hover:text-red-500"
                            onClick={() => onRemove(tag)}
                        />
                    </Badge>
                ))}
            </div>
        </div>
    );
};

export default TagInput;