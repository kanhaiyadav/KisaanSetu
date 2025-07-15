import { Server } from "socket.io";

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

        socket.on("pagal", (email) => {
            console.log("User email received:", email);
        });

        // Handle events here
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    io.engine.on("connection_error", (err: any) => {
        console.error("Socket.IO connection error:", err);
    });

    return io;
};
