import Farmer from "../Models/Farmer.js";
import Consumer from "../Models/Consumer.js";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const { isfarmer, name, email, country, state, city, pincode, address, password, confirmPassword } = req.body;
        if (isfarmer) {
            await Farmer.create({ name, email, country, state, city, pincode, address, password });
            return res.status(200).json({
                message: "Signed up successfully",
            })
        } else {
            await Consumer.create({ name, email, country, state, city, pincode, address, password });
            return res.status(200).json({
                message: "Signed up successfully",
            })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await Farmer.findOne({ email });
        if (!user) {
            user = await Consumer.findOne({ email });
            if (!user)
                return res.status(400).json({ message: "Invalid email or password" });
            else {
                if (user.password !== password)
                    return res.status(400).json({ message: "Invalid email or password" });
                else {
                    return res.status(200).json({
                        data: {
                            user,
                            isfarmer: false,
                            token: "Bearer " + jwt.sign({ id: user._id, email: email, isfarmer: false }, 'KisaanSetu', { expiresIn: '7d' })
                        },
                        message: "signed in successfully"
                    });
                }
            }
        } else {
            if (user.password !== password)
                return res.status(400).json({ message: "Invalid email or password" });
            else {
                return res.status(200).json({
                    data: {
                        user,
                        isfarmer: true,
                        token: "Bearer " + jwt.sign({ id: user._id, email: email, isfarmer: true }, 'KisaanSetu', { expiresIn: '1d' })
                    },
                    message: "signed in successfully"
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
