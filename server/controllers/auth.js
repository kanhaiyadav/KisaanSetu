import Farmer from "../Models/Farmer.js";
import Consumer from "../Models/Consumer.js";

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