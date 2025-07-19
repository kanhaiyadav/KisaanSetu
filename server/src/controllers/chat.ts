import { Request, Response } from "express";
import Chat from "@/Models/Chats";

const getChats = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const chats = await Chat.find({ participants: userId }).populate("participants");
        res.status(200).json({
            error: null,
            data: chats
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve chats" });
    }
}

const createChat = async (req: Request, res: Response) => {
    try {
        const { participants } = req.body;
        if (!participants || participants.length < 2) {
            return res.status(400).json({ error: "At least two participants are required to create a chat." });
        }
        let chat = await Chat.findOne({ participants: { $all: participants } });
        if (chat) {
            await chat.populate("participants");
            return res.status(200).json({
                error: null,
                data: chat.toObject()
            });
        }
        chat = new Chat({ participants });
        await chat.save();
        await chat.populate("participants");
        // Emit chat creation event if using socket.io or similar
        res.status(201).json({
            error: null,
            data: chat,
        });
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(500).json({ error: "Failed to create chat" });
    }
};

export { createChat, getChats };
