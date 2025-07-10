import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
            unique: true,
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
            unique: true,
        },
        socialMediaLinks: [
            {
                platform: {
                    type: String,
                    enum: ["facebook", "instagram", "twitter", "linkedin", "youtube"],
                },
                url: {
                    type: String,
                },
                id: {
                    type: String,
                },
            }
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
            }
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

const User = mongoose.model("User", userSchema);
export default User;
