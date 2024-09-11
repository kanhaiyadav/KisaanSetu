import Product from '../Models/product.js';
import Farmer from '../Models/Farmer.js';
import Sale from '../Models/sale.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.params.farmerId }).populate('farmer');
        res.status(200).json({
            data: {
                products,
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, price, stocks } = req.body;
        const product = await Product.create({ name, price, stocks, image: Product.productImagePath + '\\' + req.file.filename, farmer: req.user._id });
        await Farmer.updateOne(
            { _id: req.user._id },
            { $push: { products: product._id } }
        );
        res.status(200).json({
            data: {
                product,
            },
            message: "Product added successfully",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        await Farmer.updateOne(
            { _id: req.user._id },
            { $pull: { products: req.params.id } }
        );
        res.status(200).json({
            data: {
                _id: req.params.id,
            },
            message: "Product deleted successfully",
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { _id, name, price, stocks } = req.body;
        if (req.file) {
            console.log('i am with file');
            await Product.findByIdAndUpdate(_id, { name, price, stocks, image: Product.productImagePath + '\\' + req.file.filename });
        }
        else {
            console.log('i am without file');
            await Product.findByIdAndUpdate(
                _id,
                { name, price, stocks },
            );
        }
        const product = await Product.findById(_id);
        console.log(product, _id);
        res.status(200).json({
            data: {
                product,
            },
            message: "Product updated successfully",
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createSale = async (req, res) => {
    try {
        const { price, quantity, total, product } = req.body;
        await Sale.create({ price, quantity, total, product });
        const productToUpdate = await Product.findById(product);
        console.log(productToUpdate);
        productToUpdate.stocks -= quantity;
        productToUpdate.price = price;
        await productToUpdate.save();
        return res.status(201).json({
            data: {
                product: productToUpdate,
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const search = async (req, res) => {
    try {
        const name = req.params.name;
        const products = await Product.find({ name: { $regex: new RegExp(name, 'i') } }).populate('farmer');
        res.status(200).json({
            data: {
                products,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}