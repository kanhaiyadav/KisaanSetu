import express from 'express';
import './config/database.js';
import './config/passportJwt.js';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './Routes/index.js';
import cors from 'cors';
import multer from 'multer';
import { spawn } from 'child_process';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // `ext` already includes the dot, like '.jpg' or '.png'
        const filename = `${file.fieldname}-${Date.now()}${ext}`; // no need to add '.' manually
        cb(null, filename);
    }
});

const upload = multer({ storage: storage, dest: 'uploads/' });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
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
// Handle preflight requests
app.options('*', cors(corsOptions)); // This will handle OPTIONS requests for all routes

//initilizing the assests folder
app.use(express.static("./assets"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use('/', router);

app.post('/classify', upload.single('image'), (req, res) => {
    console.log('hello from server');
    const imagePath = path.join(__dirname, req.file.path);

    // Spawn a Python process to run the classifier.py script
    const pythonProcess = spawn('python', ['../python_scripts/classifier.py', imagePath]);

    // Collect the output from the Python script
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
    });

    // Once the Python process finishes, send the result back to the client
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            return res.status(500).send('Error in classifying image');
        }
        res.json({ result });
    });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
