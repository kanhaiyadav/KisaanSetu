import { Request, Response } from "express";
import User, { IUser } from "../Models/User";
import { getPresignedUrl, uploadImageFromBuffer } from "@/utils/s3";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { email, phone } = req.query as { email?: string, phone?: string };

        console.log("Fetching user with email:", email, "or phone:", phone);

        let user = null;

        if (email) {
            user = await User.findOne({ email }).lean();
        }else if (phone) {
            user = await User.findOne({ phone }).lean();
        } else {
            return res.status(400).json({ message: "Email or Phone is required" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let avatarSignedUrl = { url: "" };
        let bannerSignedUrl = { url: "" };

        if (user.avatar && user.avatar.length !== 0) {
            const result = await getPresignedUrl(user.avatar);
            avatarSignedUrl = { url: result.url || "" };
        }
        if (user.banner && user.banner.length !== 0) {
            const result = await getPresignedUrl(user.banner);
            bannerSignedUrl = { url: result.url || "" };
        }

        res.status(200).json({
            error: null,
            data: {
                userData: {
                    ...user,
                    avatar: avatarSignedUrl.url,
                    banner: bannerSignedUrl.url,
                },
            },
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createNewUser = async (req: Request, res: Response) => {
    try {
        const { type, name, email, phone } = req.body as Partial<IUser>;

        if (email) {
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                const newUser = await User.create({ type, name, email });
                return res.status(201).json({
                    error: null,
                    data: {
                        user: newUser,
                    },
                });
            }
        } else if (phone) {
            const user = await User.findOne({ phone });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                const newUser = await User.create({ type, name, phone });
                return res.status(201).json({
                    error: null,
                    data: {
                        user: newUser,
                    },
                });
            }
        } else {
            return res
                .status(400)
                .json({ message: "Email or Phone is required" });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const uploadAvatar = async (req: Request, res: Response) => {
    try {
        const { email } = req.query as { email?: string };
        const file = req.file as Express.Multer.File;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const response = await uploadImageFromBuffer(
            file.buffer,
            `farmers/${user.id}/profile/avatar`,
            file.originalname
        );

        if (!response) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        user.avatar = response.key;
        await user.save();

        const avatarSignedUrl = response.key ? await getPresignedUrl(response.key) : { url: "" };

        res.status(200).json({
            error: null,
            data: {
                user: {
                    ...user.toObject(),
                    avatar: avatarSignedUrl.url,
                },
            },
        });
    } catch (error) {
        console.error("Error uploading avatar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const uploadBanner = async (req: Request, res: Response) => {
    try {
        const { email } = req.query as { email?: string };
        const file = req.file as Express.Multer.File;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const response = await uploadImageFromBuffer(
            file.buffer,
            `farmers/${user.id}/profile/banner`,
            file.originalname
        );

        if (!response) {
            return res.status(500).json({ message: "Failed to upload banner" });
        }

        user.banner = response.key;
        await user.save();

        const bannerSignedUrl = response.key ? await getPresignedUrl(response.key) : { url: "" };

        res.status(200).json({
            error: null,
            data: {
                user: {
                    ...user.toObject(),
                    banner: bannerSignedUrl.url,
                },
            },
        });
    } catch (error) {
        console.error("Error uploading banner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.query as { email?: string };
        const { userData } = req.body as { userData: Partial<IUser> };

        if (!email || !userData) {
            return res
                .status(400)
                .json({ message: "Email and user data are required" });
        }

        const user = await User.findOneAndUpdate(
            { email },
            { $set: userData },
            { new: true }
        ).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            error: null,
            data: {
                userData: user,
            },
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
