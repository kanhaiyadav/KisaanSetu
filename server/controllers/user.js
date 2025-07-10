import User from "../Models/User.js";
import { getPresignedUrl, uploadImageFromBuffer } from "../utils/s3.js";

export const getUser = async (req, res) => {
    try {
        const { email } = req.query;

        let user;
        if (email) {
            user = await User.findOne({ email }).lean();
        } else {
            return res
                .status(400)
                .json({ message: "User email is required" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let avatarSignedUrl = {
            url: ""
        };
        let bannerSignedUrl = {
            url: ""
        };
        if (user.avatar && user.avatar.length !== 0) {
            avatarSignedUrl = await getPresignedUrl(user.avatar);
        }
        if (user.banner && user.banner.length !== 0) {
            bannerSignedUrl = await getPresignedUrl(user.banner);
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

export const createNewUser = async (req, res) => {
    try {
        const { type, name, email, phone } = req.body;
        if (email) {
            const user = await User.findOne({ name, email });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                const newUser = await User.create({
                    type,
                    name,
                    email,
                });
                res.status(201).json({
                    error: null,
                    data: {
                        user: newUser,
                    },
                });
            }
        } else if (phone) {
            const user = await User.findOne({ name, phone });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            } else {
                const newUser = await User.create({
                    type,
                    name,
                    phone,
                });
                res.status(201).json({
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

export const uploadAvatar = async (req, res) => {
    try {
        const { email } = req.query;
        const { file } = req;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const responce = await uploadImageFromBuffer(
            file.buffer,
            `farmers/${user.id}/profile/avatar`,
            file.originalname
        );

        console.log("Response from S3:", responce);

        if (!responce) {
            return res.status(500).json({ message: "Failed to upload avatar" });
        }

        user.avatar = responce.key;
        await user.save();

        const avatarSignedUrl = await getPresignedUrl(responce.key);
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

export const uploadBanner = async (req, res) => {
    try {
        const { email } = req.query;
        const { file } = req;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const res = await uploadImageFromBuffer(
            file.buffer,
            `farmers/${user.id}/profile/banner`,
            file.originalname
        );

        if (!res) {
            return res.status(500).json({ message: "Failed to upload banner" });
        }

        const bannerSignedUrl = await getPresignedUrl(res.key);
        user.banner = res.key;
        await user.save();

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


export const updateUser = async (req, res) => {
    try {
        const { email } = req.query;
        const { userData } = req.body;

        console.log("***********************", email, userData);

        if (!email || !userData) {
            return res.status(400).json({ message: "Email and user data are required" });
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