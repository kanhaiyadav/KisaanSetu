import { Request, Response } from "express";
import mongoose, { Document, Model } from "mongoose";
import Product from "../Models/Product";
import Farmer from "../Models/Farmer";
import Sale from "../Models/Sale";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

// Types and Interfaces
interface IProduct extends Document {
    name: string;
    price: number;
    stocks: number;
    description?: string;
    image?: string;
    priceUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    stocksUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    farmer: mongoose.Types.ObjectId;
}

interface IProductModel extends Model<IProduct> {
    uploadedImage: any; // multer return type
    productImagePath: string;
}

interface IFarmer extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    products: mongoose.Types.ObjectId[];
    sales: mongoose.Types.ObjectId[];
}

interface ISale extends Document {
    price: number;
    quantity: number;
    total: number;
    product: mongoose.Types.ObjectId;
    productName: string;
    priceUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    stocksUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    date: Date;
    customer: string;
}

// Extend Request to include user and file properties
interface AuthenticatedRequest extends Request {
    user?: {
        _id: mongoose.Types.ObjectId;
        [key: string]: any;
    };
    file?: Express.Multer.File;
}

// Request body types
interface AddProductBody {
    name: string;
    price: string | number;
    stocks: string | number;
    priceUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    stocksUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    id: string; // Optional for authenticated user
}

interface UpdateProductBody {
    _id: string;
    name: string;
    price: string | number;
    stocks: string | number;
    priceUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    stocksUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
}

interface CreateSaleBody {
    price: number;
    quantity: number;
    total: number;
    product: string;
    productName: string;
    priceUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    stocksUnit: "kg" | "lb" | "g" | "dz" | "pc" | "tonne";
    date: Date;
    customer: string;
    userId: string;
}

// Response types
interface ApiResponse<T = any> {
    data?: T;
    message?: string;
    error?: string;
}

// Environment variables
const bucketName: string = process.env.BUCKET_NAME!;
const region: string = process.env.BUCKET_REGION!;
const accessKey: string = process.env.ACCESS_KEY!;
const secretAccessKey: string = process.env.SECRET_ACCESS_KEY!;

// S3 Client
const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
});

// Helper function to generate signed URL
const generateSignedUrl = async (key: string): Promise<string> => {
    const getObjectParams = {
        Bucket: bucketName,
        Key: key,
    };
    const command = new GetObjectCommand(getObjectParams);
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

// Helper function to upload image to S3
const uploadImageToS3 = async (
    key: string,
    buffer: Buffer,
    contentType: string
): Promise<void> => {
    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        })
    );
};

// Helper function to delete image from S3
const deleteImageFromS3 = async (key: string): Promise<void> => {
    await s3Client.send(
        new DeleteObjectCommand({
            Bucket: bucketName,
            Key: key,
        })
    );
};

export const getProducts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const products = await Product.find({
            farmer: req.params.farmerId,
        }).populate("farmer");

        // Generate signed URLs for all products
        for (let i = 0; i < products.length; i++) {
            const imageKey = `farmers/${req.params.farmerId}/products/${products[i].name}.jpeg`;
            const url = await generateSignedUrl(imageKey);
            products[i].image = url;
        }

        res.status(200).json({
            data: {
                products,
            },
        } as ApiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};

export const addProduct = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        console.log(req.file);
        const { name, price, stocks, priceUnit, stocksUnit, id }: AddProductBody =
            req.body;

        if (!id) {
            res.status(401).json({
                message: "User not authenticated",
            } as ApiResponse);
            return;
        }

        if (!req.file) {
            res.status(400).json({
                message: "Product image is required",
            } as ApiResponse);
            return;
        }

        // Create product
        const product = await Product.create({
            name,
            price: Number(price),
            stocks: Number(stocks),
            priceUnit,
            stocksUnit,
            farmer: id,
        });

        // Update farmer's products array
        await Farmer.updateOne(
            { _id: id },
            { $push: { products: product._id } }
        );

        // Upload image to S3
        const imageKey = `farmers/${id}/products/${name}.jpeg`;
        await uploadImageToS3(imageKey, req.file.buffer, req.file.mimetype);

        // Generate signed URL and update product
        const url = await generateSignedUrl(imageKey);
        product.image = url;
        await product.save();

        res.status(200).json({
            data: {
                product,
            },
            message: "Product added successfully",
        } as ApiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};

export const deleteProduct = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.user?._id) {
            res.status(401).json({
                message: "User not authenticated",
            } as ApiResponse);
            return;
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({
                message: "Product not found",
            } as ApiResponse);
            return;
        }

        // Delete product from database
        await Product.findByIdAndDelete(req.params.id);

        // Remove product from farmer's products array
        await Farmer.updateOne(
            { _id: req.user._id },
            { $pull: { products: req.params.id } }
        );

        // Delete image from S3
        const imageKey = `farmers/${req.user._id}/products/${product.name}.jpeg`;
        await deleteImageFromS3(imageKey);

        res.status(200).json({
            data: {
                _id: req.params.id,
            },
            message: "Product deleted successfully",
        } as ApiResponse);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};

export const updateProduct = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const {
            _id,
            name,
            price,
            stocks,
            stocksUnit,
            priceUnit,
        }: UpdateProductBody = req.body;

        if (!req.user?._id) {
            res.status(401).json({
                message: "User not authenticated",
            } as ApiResponse);
            return;
        }

        // Upload new image if provided
        if (req.file) {
            console.log("Updating with new file");
            const imageKey = `farmers/${req.user._id}/products/${name}.jpeg`;
            await uploadImageToS3(imageKey, req.file.buffer, req.file.mimetype);
        }

        // Generate signed URL
        const imageKey = `farmers/${req.user._id}/products/${name}.jpeg`;
        const url = await generateSignedUrl(imageKey);

        // Update product
        await Product.findByIdAndUpdate(_id, {
            name,
            price: Number(price),
            stocks: Number(stocks),
            stocksUnit,
            priceUnit,
            image: url,
        });

        const product = await Product.findById(_id);

        res.status(200).json({
            data: {
                product,
            },
            message: "Product updated successfully",
        } as ApiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};

export const outOfStock = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        console.log(req.params.id);
        await Product.findByIdAndUpdate(req.params.id, { stocks: 0 });

        res.status(200).json({
            message: "Product marked as out of stock",
        } as ApiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};

export const createSale = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            price,
            quantity,
            total,
            product,
            productName,
            priceUnit,
            stocksUnit,
            date,
            customer,
            userId,
        }: CreateSaleBody = req.body;

        // Create sale
        const sale = await Sale.create({
            price,
            quantity,
            total,
            product,
            priceUnit,
            stocksUnit,
            productName,
            date,
            customer,
        });

        console.log(sale);

        // Update product stock
        await Product.updateOne(
            { _id: product },
            { $inc: { stocks: -quantity } }
        );

        // Add sale to farmer's sales array
        await Farmer.updateOne({ _id: userId }, { $push: { sales: sale._id } });

        res.status(201).json({
            message: "Sale created successfully",
            data: {
                sale: sale,
            },
        } as ApiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};

export const getSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const farmer = await Farmer.findById(req.params.farmerId).populate({
            path: "sales",
            populate: {
                path: "product",
            },
        });

        if (!farmer) {
            res.status(404).json({
                message: "Farmer not found",
            } as ApiResponse);
            return;
        }

        //@ts-ignore
        const sales = farmer.sales;
        res.status(200).json({
            data: {
                sales,
            },
        } as ApiResponse);
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};

export const search = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.params.name;
        const products = await Product.find({
            name: { $regex: new RegExp(name, "i") },
        }).populate("farmer");
        // Generate signed URLs for all products
        for (let i = 0; i < products.length; i++) {
            const imageKey = `farmers/${products[i].farmer._id}/products/${products[i].name}.jpeg`;
            const url = await generateSignedUrl(imageKey);
            products[i].image = url;
            await products[i].save();
        }

        res.status(200).json({
            data: {
                products,
            },
        } as ApiResponse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Unknown error",
        } as ApiResponse);
    }
};
