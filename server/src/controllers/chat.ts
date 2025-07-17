import { Request, Response } from "express";
import Chat from "@/Models/chats";

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

const getChats = async (req: Request, res: Response) => {
    try {
        const chats = await Chat.find().populate("participants");
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve chats" });
    }
};

export { createChat, getChats };
