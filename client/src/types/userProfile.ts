export interface FormData {
    name: string;
    about: string;
    dateOfBirth?: Date;
    languages: string[];
    address: {
        streetAddress: string;
        country: string;
        state: string;
        city: string;
        postalCode: string;
    };
    farm: {
        location: string;
        size: string;
        sizeUnit: 'acres' | 'hectares' | 'sqft' | 'sqm';
        primaryCrops: string[];
    };
    socialMediaLinks: Array<{
        platform: string;
        url: string;
        id: string; // Unique identifier for the social media link
    }>;
}

export interface FormErrors {
    name?: string;
    about?: string;
    languages?: string;
    address?: {
        streetAddress?: string;
        country?: string;
        state?: string;
        city?: string;
        postalCode?: string;
    };
    farm?: {
        location?: string;
        size?: string;
        sizeUnit?: string;
        primaryCrops?: string;
    };
    socialMediaLinks?: string;
}