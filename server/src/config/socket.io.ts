import { Server } from "socket.io";
import Chat from "@/Models/Chats";
import Message from "@/Models/Message";

type IsActiveResponse = Array<{
    isActive: boolean;
}>

interface EmitError {
    message?: string;
    code?: string;
}

export const setupSocketIO = (httpServer: any) => {
    const io = new Server(httpServer, {
        cors: {
            origin: [
                "http://localhost:5173",
                "https://kisaansetu.kanhaiya.me",
                "https://kisaansetufe.vercel.app",
            ],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("join-online-room", async (userId: string) => {
            const Chats = await Chat.find({ participants: userId });
            Chats.forEach((chat: any) => {
                socket.join(chat._id.toString());
                socket.to(chat._id.toString()).emit("status-update", { status: "online" });
                console.log(`User ${userId} joined chat room: ${chat._id}`);
            });
        });

        socket.on("isOnline", (chatId: string, callback) => {
            console.log("Status update requested for chat:", chatId);
            const roomSize = io.sockets.adapter.rooms.get(chatId)?.size || 0;
            if (roomSize > 1) {
                callback({ status: "online" });
            } else {
                callback({ status: "offline" });
            }
        });

        socket.on("isActive", (chatId: string, callback) => {
            console.log("Is active requested for chat:", chatId);
            socket.to(chatId).timeout(5000).emit("isActive", chatId, (err: Error| null, response: IsActiveResponse) => {
                console.log("Is active response received:", response);
                if (err) {
                    console.error("Error in isActive response:", err);
                    callback({ isActive: false });
                    return;
                }
                if (response && response[0] && response[0].isActive) {
                    callback({ isActive: true });
                } else {
                    callback({ isActive: false });
                }
            });
        });

        socket.on("chat-is-active", async (chatId: string) => {
            socket.to(chatId).emit("status-update", { status: "active" });
        });

        socket.on('chat-is-inactive', (chatId: string) => {
            const roomSize = io.sockets.adapter.rooms.get(chatId)?.size;
            if( roomSize && roomSize > 1) {
                socket.to(chatId).emit("status-update", { status: "online" });
            } else {
                socket.to(chatId).emit("status-update", { status: "offline" });
            }
        });

        socket.on('reset-unread-count', async (chatId: string) => { 
            await Chat.findByIdAndUpdate(chatId, { unreadCount: 0 });
        })

        // Handle events here
        socket.on("disconnecting", () => {
            console.log("User disconnecting:", socket.rooms);
            socket.rooms.forEach((room) => {
                console.log(`User ${socket.id} left room: ${room}`);
                socket.to(room).emit("status-update", { status: "offline" });
            });
        });
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });

        socket.on("send-message", async (data: { chatId: string; message: { senderId: string; content: string } }) => {
            console.log("Message received:", data);
            const { chatId, message } = data;
            try {
                const newMessage = await Message.create({
                    chat: chatId,
                    sender: message.senderId,   
                    content: message.content
                });
                // Emit the message to the specific chat room
                socket.timeout(100).to(chatId).emit("new-message", newMessage.toObject(), async (err: Error | null, response:any) => {
                    console.log("Message sent response:", response);
                    if (err) {
                        console.error("Error sending message:", err);
                        socket.to(chatId).emit("unread-message", chatId, newMessage);
                        await Chat.findByIdAndUpdate(chatId, {
                            $inc: { unreadCount: 1 },
                        });
                    }
                    // if (response && response.length === 0) {
                    //     socket.to(chatId).emit("unread-message", chatId);
                    //     await Chat.findByIdAndUpdate(chatId, {
                    //         $inc: { unreadCount: 1 },
                    //     });
                    // }
                });

                await Chat.findByIdAndUpdate(chatId, {
                    lastMessage: {
                        sender: message.senderId,
                        content: message.content,
                        timestamp: newMessage.createdAt || new Date().toISOString(),
                    }
                });

            } catch (error) {
                console.error("Error sending message:", error);
                socket.emit("error", { message: "Failed to send message", code: "SEND_MESSAGE_ERROR" } as EmitError);
            }
        });
    });

    io.engine.on("connection_error", (err: any) => {
        console.error("Socket.IO connection error:", err);
    });

    return io;
};
