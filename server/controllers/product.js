import Product from "../Models/product.js";
import Farmer from "../Models/Farmer.js";
import Sale from "../Models/Sale.js";
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAcessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
    region: region,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAcessKey,
    },
});

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({
            farmer: req.params.farmerId,
        }).populate("farmer");

        for (let i = 0; i < products.length; i++) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: `farmers/${req.params.farmerId}/products/${products[i].name}.jpeg`,
            };
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3Client, command, {
                expiresIn: 3600,
            });
            products[i].image = url;
        }

        res.status(200).json({
            data: {
                products,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const addProduct = async (req, res) => {
    try {
        console.log(req.file);
        const { name, price, stocks, priceUnit, stocksUnit } = req.body;
        // console.log(req.body);
        const product = await Product.create({
            name,
            price,
            stocks,
            priceUnit,
            stocksUnit,
            farmer: req.user._id,
        });

        await Farmer.updateOne(
            { _id: req.user._id },
            { $push: { products: product._id } }
        );

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: `farmers/${req.user._id}/products/${req.body.name}.jpeg`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            })
        );

        const getObjectParams = {
            Bucket: bucketName,
            Key: `farmers/${req.user._id}/products/${product.name}.jpeg`,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        product.image = url;
        product.save();

        res.status(200).json({
            data: {
                product,
            },
            message: "Product added successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        await Product.findByIdAndDelete(req.params.id);
        await Farmer.updateOne(
            { _id: req.user._id },
            { $pull: { products: req.params.id } }
        );
        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucketName,
                Key: `farmers/${req.user._id}/products/${product.name}.jpeg`,
            })
        )
        res.status(200).json({
            data: {
                _id: req.params.id,
            },
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { _id, name, price, stocks, stocksUnit, priceUnit } = req.body;
        if (req.file) {
            console.log("i am with file");

            await s3Client.send(
                new PutObjectCommand({
                    Bucket: bucketName,
                    Key: `farmers/${req.user._id}/products/${req.body.name}.jpeg`,
                    Body: req.file.buffer,
                    ContentType: req.file.mimetype,
                })
            );
        }
        const getObjectParams = {
            Bucket: bucketName,
            Key: `farmers/${req.user._id}/products/${name}.jpeg`,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
        });
        await Product.findByIdAndUpdate(_id, {
            name,
            price,
            stocks,
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
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const outOfStock = async (req, res) => {
    try {
        console.log(req.params.id);
        await Product.findByIdAndUpdate(req.params.id, { stocks: 0 });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

export const createSale = async (req, res) => {
    try {
        const { price, quantity, total, product, date, customer, userId } =
            req.body;
        const sale = await Sale.create({
            price,
            quantity,
            total,
            product,
            date,
            customer,
        });
        console.log(sale);
        const productToUpdate = await Product.findById(product);
        productToUpdate.stocks -= quantity;
        productToUpdate.price = price;
        await productToUpdate.save();
        await Farmer.updateOne({ _id: userId }, { $push: { sales: sale._id } });
        return res.status(201).json({
            data: {
                product: productToUpdate,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getSales = async (req, res) => {
    try {
        const farmer = await Farmer.findById(req.params.farmerId).populate({
            path: "sales",
            populate: {
                path: "product",
            },
        });
        const sales = farmer.sales;
        res.status(200).json({
            data: {
                sales,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const search = async (req, res) => {
    try {
        const name = req.params.name;
        const products = await Product.find({
            name: { $regex: new RegExp(name, "i") },
        }).populate("farmer");
        res.status(200).json({
            data: {
                products,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
