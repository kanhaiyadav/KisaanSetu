import Product from '../Models/product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.params.farmerId });
        console.log(req.params.farmerId, products);
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
        const { name, price,  stocks } = req.body;
        const product = await Product.create({ name, price, stocks, image: Product.productImagePath + '\\' + req.file.filename, farmer: req.user._id });
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