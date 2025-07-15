import express from "express";
import "./config/database.ts";
import path from "path";
import router from "./Routes/index";
import cors from "cors";
import { setupSocketIO } from "./config/socket.io";
import { createServer } from "http";

const app = express();
const __dirname = path.resolve();

const allowedOrigins = [
    "http://localhost:5173",
    "https://kisaansetu.kanhaiya.me",
    "https://kisaansetufe.vercel.app",
];

interface CorsCallback {
    (err: Error | null, allow?: boolean): void;
}

interface CorsOptions {
    origin: (origin: string | undefined, callback: CorsCallback) => void;
    methods: string[];
    credentials: boolean;
}

const corsOptions: CorsOptions = {
    origin: function (origin: string | undefined, callback: CorsCallback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg: string =
                "The CORS policy for this site does not allow access from the specified origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

const httpServer = createServer(app);
setupSocketIO(httpServer);

httpServer.listen(3000, () => {
    console.log("Socket.IO server is running on http://localhost:3000");
});

// app.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });
