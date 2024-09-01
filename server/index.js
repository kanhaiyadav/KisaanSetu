import express from 'express';
import './config/database.js';
import router from './Routes/index.js';
import cors from 'cors';

const app = express();

const allowedOrigins = ["http://localhost:5173"];
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
