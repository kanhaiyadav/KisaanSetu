import Farmer from "../Models/Farmer.js";
import Consumer from "../Models/Consumer.js";

export const unique = async (req, res) => {
    try {
        const { email } = req.body;
        let farmer = await Farmer.findOne({ email });
        if (farmer)
            return res.status(400).json({ error: "This email is already in use!", isFarmer: true });
        else {
            let consumer = await Consumer.findOne({ email });
            if (consumer)
                return res.status(400).json({ error: "This email is already in use!", isFarmer: false });
            else {
                return res.status(200).json({ success: "Email is unique"});
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verify = async (req, res) => {
    try {
        return res.status(200).json({
            data: {
                user: req.user,
            },
            message: "verified"
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}