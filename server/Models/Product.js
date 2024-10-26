import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCT_IMAGE_PATH = path.join('/uploads/products');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stocks: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", PRODUCT_IMAGE_PATH));
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = `${Date.now() + '-' + Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, file.fieldname + '-' + uniqueSuffix);
    },
});

productSchema.statics.uploadedImage = multer({ storage: storage }).single('image'); // handles multipart form
productSchema.statics.productImagePath = PRODUCT_IMAGE_PATH;

const Product = mongoose.model('Product', productSchema);
export default Product;