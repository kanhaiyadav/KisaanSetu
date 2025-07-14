import mongoose, { Document, Schema, Model } from "mongoose";
import multer from "multer";
import path from "path";

// Path for storing product images (not used in memoryStorage directly)
const PRODUCT_IMAGE_PATH = path.join("/uploads/products");

// Define interface for Product document
export interface IProduct extends Document {
    name: string;
    price: number;
    stocks: number;
    description?: string;
    image?: string;
    priceUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    stocksUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    farmer: mongoose.Types.ObjectId;
}

// Extend Mongoose Model to include custom statics
interface IProductModel extends Model<IProduct> {
    uploadedImage: ReturnType<typeof multer>["single"];
    productImagePath: string;
}

// Define schema
const productSchema = new Schema<IProduct, IProductModel>({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stocks: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: false,
    },
    priceUnit: {
        type: String,
        enum: ["kg", "lb", "g", "dz", "pc", "tonne"],
        required: true,
    },
    stocksUnit: {
        type: String,
        enum: ["kg", "lb", "g", "dz", "pc", "tonne"],
        required: true,
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Farmer",
    },
});

// Configure Multer to use memory storage
const storage = multer.memoryStorage();

// Add custom statics to schema
productSchema.statics.uploadedImage = multer({ storage }).single("image");
//@ts-ignore
productSchema.statics.productImagePath = PRODUCT_IMAGE_PATH;

// Create the model
const Product = mongoose.model<IProduct, IProductModel>(
    "Product",
    productSchema
);

export default Product;
