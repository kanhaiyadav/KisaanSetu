import React, { useState } from 'react';
import { Plus, X, Facebook, Twitter, Youtube, Instagram } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TagInput from "./TagInput";
import { FormData, FormErrors } from '@/types/userProfile';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Social media platform configuration
const socialMediaPlatforms = [
    {
        value: 'facebook',
        label: 'Facebook',
        icon: Facebook,
        placeholder: 'https://facebook.com/username',
        pattern: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9._-]+\/?$/
    },
    {
        value: 'twitter',
        label: 'X (Twitter)',
        icon: Twitter,
        placeholder: 'https://x.com/username or https://twitter.com/username',
        pattern: /^https?:\/\/(www\.)?(x\.com|twitter\.com)\/[a-zA-Z0-9_]+\/?$/
    },
    {
        value: 'youtube',
        label: 'YouTube',
        icon: Youtube,
        placeholder: 'https://youtube.com/channel/... or https://youtube.com/@username',
        pattern: /^https?:\/\/(www\.)?youtube\.com\/(channel\/[a-zA-Z0-9_-]+|@[a-zA-Z0-9_-]+|c\/[a-zA-Z0-9_-]+)\/?$/
    },
    {
        value: 'instagram',
        label: 'Instagram',
        icon: Instagram,
        placeholder: 'https://instagram.com/username',
        pattern: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/
    }
];

// Extend FormData type to include social media links
interface SocialMediaLink {
    platform: string;
    url: string;
    id: string;
}

const SocialInfoStep: React.FC<{
    formData: FormData;
    errors: FormErrors;
    onChange: (data: Partial<FormData>) => void;
}> = ({ formData, errors, onChange }) => {
    const [selectedPlatform, setSelectedPlatform] = useState('facebook');
    const [linkUrl, setLinkUrl] = useState('');
    const [linkError, setLinkError] = useState('');

    const handleAddLanguage = (language: string) => {
        onChange({ languages: [...formData.languages, language] });
    };

    const handleRemoveLanguage = (language: string) => {
        onChange({ languages: formData.languages.filter(l => l !== language) });
    };

    const validateSocialMediaUrl = (platform: string, url: string): string => {
        if (!url.trim()) {
            return 'URL is required';
        }

        const platformConfig = socialMediaPlatforms.find(p => p.value === platform);
        if (!platformConfig) {
            return 'Invalid platform selected';
        }

        if (!platformConfig.pattern.test(url)) {
            return `Please enter a valid ${platformConfig.label} URL`;
        }

        // Check if this platform already exists
        const existingLinks = formData.socialMediaLinks || [];
        const platformExists = existingLinks.some(link => link.platform === platform);
        if (platformExists) {
            return `${platformConfig.label} link already exists`;
        }

        return '';
    };

    const handleAddSocialMediaLink = () => {
        const error = validateSocialMediaUrl(selectedPlatform, linkUrl);
        if (error) {
            setLinkError(error);
            return;
        }

        const newLink: SocialMediaLink = {
            platform: selectedPlatform,
            url: linkUrl,
            id: Date.now().toString()
        };

        const updatedLinks = [...(formData.socialMediaLinks || []), newLink];
        onChange({ socialMediaLinks: updatedLinks });

        setLinkUrl('');
        setLinkError('');
    };

    const handleRemoveSocialMediaLink = (id: string) => {
        const updatedLinks = (formData.socialMediaLinks || []).filter(link => link.id !== id);
        onChange({ socialMediaLinks: updatedLinks });
    };

    const handleUrlChange = (value: string) => {
        setLinkUrl(value);
        if (linkError) {
            setLinkError('');
        }
    };

    const selectedPlatformConfig = socialMediaPlatforms.find(p => p.value === selectedPlatform);

    return (
        <div className="space-y-6">
            <TagInput
                label="Languages"
                placeholder="Language you speak"
                tags={formData.languages}
                onAdd={handleAddLanguage}
                onRemove={handleRemoveLanguage}
                error={errors.languages}
            />

            {/* Social Media Links Section */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    Social Media Links
                </label>

                {/* Add Social Media Link Form */}
                <div className="space-y-3">
                    <div className="flex gap-3">
                        {/* Platform Dropdown */}
                        <div className="flex-1">
                            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    {socialMediaPlatforms.map((platform) => {
                                        const IconComponent = platform.icon;
                                        return (
                                            <SelectItem key={platform.value} value={platform.value}>
                                                <div className="flex items-center gap-2">
                                                    <IconComponent size={16} />
                                                    <span>{platform.label}</span>
                                                </div>
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* URL Input */}
                        <div className="flex-[2]">
                            <Input
                                type="url"
                                value={linkUrl}
                                onChange={(e) => handleUrlChange(e.target.value)}
                                placeholder={selectedPlatformConfig?.placeholder}
                                className={`${linkError ? 'ring-2 ring-offset-2 ring-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
                            />
                        </div>

                        {/* Add Button */}
                        <Button
                            type="button"
                            onClick={handleAddSocialMediaLink}
                            size={'icon'}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>

                    {/* Error Message */}
                    {linkError && (
                        <p className="text-sm text-red-600">{linkError}</p>
                    )}
                </div>

                {/* Display Added Social Media Links */}
                {formData.socialMediaLinks && formData.socialMediaLinks.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-700">Added Links:</h4>
                        <div className="space-y-2">
                            {formData.socialMediaLinks.map((link) => {
                                const platformConfig = socialMediaPlatforms.find(p => p.value === link.platform);
                                const IconComponent = platformConfig?.icon || Facebook;

                                return (
                                    <div
                                        key={link.id}
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border"
                                    >
                                        <IconComponent size={20} className="text-gray-600" />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-900">
                                                {platformConfig?.label}
                                            </div>
                                            <div className="text-sm text-gray-600 truncate">
                                                {link.url}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSocialMediaLink(link.id)}
                                            className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* General Error Message */}
                {errors.socialMediaLinks && (
                    <p className="text-sm text-red-600">{errors.socialMediaLinks}</p>
                )}
            </div>
        </div>
    );
};

export default SocialInfoStep;