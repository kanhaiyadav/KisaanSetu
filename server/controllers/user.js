import Farmer from "../Models/Farmer";
import Consumer from "../Models/Consumer";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}