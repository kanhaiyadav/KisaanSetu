import Farmer from "../Models/Farmer.js";
import Consumer from "../Models/Consumer.js";
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const { isfarmer, name, email, country, state, city, pincode, address, password, confirmPassword } = req.body;
        if (isfarmer) {
            let farmer = await Farmer.findOne({ email });
            if (farmer)
                return res.status(400).json({ message: "Farmer already exists" });
            else
            {
                if(password !== confirmPassword)
                    return res.status(400).json({ message: "Passwords do not match" });
                else
                {
                    farmer = await Farmer.create({ name, email, country, state, city, pincode, address, password });
                    return res.status(200).json({
                        message: "Farmer created successfully",
                    })
                }
            }
        } else {
            let consumer = await Farmer.findOne({ email });
            if (consumer)
                return res.status(400).json({ message: "Consumer already exists" });
            else {
                if (password !== confirmPassword)
                    return res.status(400).json({ message: "Passwords do not match" });
                else {
                    consumer = await Consumer.create({ name, email, country, state, city, pincode, address, password });
                    return res.status(200).json({
                        message: "Consumer created successfully",
                    })
                }
            }
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
                return res.status(400).json({ message: "User not found" });
            else {
                if (user.password !== password)
                    return res.status(400).json({ message: "Incorrect email or password" });
                else {
                    return res.status(200).json({
                        data: {
                            user,
                            isfarmer: false,
                            token: "Bearer " + jwt.sign({ id: user._id, email: email, isfarmer: false }, 'KisaanSetu', { expiresIn: '7d' })
                        },
                        message: "Consumer signed in successfully"
                    });
                }
            }
        } else {
            if (user.password !== password)
                return res.status(400).json({ message: "Incorrect email or password" });
            else {
                return res.status(200).json({
                    data: {
                        user,
                        isfarmer: true,
                        token: "Bearer " + jwt.sign({ id: user._id, email: email, isfarmer: true }, 'KisaanSetu', { expiresIn: '7d' })
                    },
                    message: "Consumer signed in successfully"
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
