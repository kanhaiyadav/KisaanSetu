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
        required: false
    },
    priceUnit: {
        type: String,
        enum: ['kg', 'lb', 'g', 'dz', 'pc', 'tonne'],
        required: true
    },
    stocksUnit: {
        type: String,
        enum: ['kg', 'lb', 'g', 'dz', 'pc', 'tonne'],
        required: true
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
});

const storage = multer.memoryStorage();
productSchema.statics.uploadedImage = multer({ storage: storage }).single('image'); // handles multipart form
productSchema.statics.productImagePath = PRODUCT_IMAGE_PATH;

const Product = mongoose.model('Product', productSchema);
export default Product;