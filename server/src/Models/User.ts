import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
    type: "farmer" | "consumer";
    name: string;
    email?: string;
    about?: string;
    dateOfBirth?: Date;
    languages: string[];
    phone?: string;
    socialMediaLinks: {
        platform: "facebook" | "instagram" | "twitter" | "linkedin" | "youtube";
        url?: string;
        id?: string;
    }[];
    address?: {
        country?: string;
        state?: string;
        city?: string;
        streetAddress?: string;
        postalCode?: string;
    };
    stats?: {
        subscribers: number;
        products: number;
        ordersCompleted: number;
        orderReceived: number;
    };
    farm?: {
        location?: string;
        size?: string;
        sizeUnit?: "acres" | "hectares" | "sqft" | "sqm";
        primaryCrops?: string[];
    };
    avatar?: string;
    banner?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// 2. Define the schema
const userSchema: Schema<IUser> = new Schema(
    {
        type: {
            type: String,
            enum: ["farmer", "consumer"],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        about: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        languages: {
            type: [String],
            default: [],
        },
        phone: {
            type: String,
        },
        socialMediaLinks: [
            {
                platform: {
                    type: String,
                    enum: [
                        "facebook",
                        "instagram",
                        "twitter",
                        "linkedin",
                        "youtube",
                    ],
                },
                url: {
                    type: String,
                },
                id: {
                    type: String,
                },
            },
        ],
        address: {
            country: {
                type: String,
            },
            state: {
                type: String,
            },
            city: {
                type: String,
            },
            streetAddress: {
                type: String,
            },
            postalCode: {
                type: String,
            },
        },
        stats: {
            subscribers: {
                type: Number,
                default: 0,
            },
            products: {
                type: Number,
                default: 0,
            },
            ordersCompleted: {
                type: Number,
                default: 0,
            },
            orderReceived: {
                type: Number,
                default: 0,
            },
        },
        farm: {
            location: {
                type: String,
            },
            size: {
                type: String,
            },
            sizeUnit: {
                type: String,
                enum: ["acres", "hectares", "sqft", "sqm"],
            },
            primaryCrops: {
                type: [String],
            },
        },
        avatar: {
            type: String,
        },
        banner: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// 3. Create the model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
