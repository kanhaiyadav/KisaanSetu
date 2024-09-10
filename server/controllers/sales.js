import Sale from "../Models/Sale.js";
import Product from "../Models/product.js";

export const createSale = async (req, res) => {
    try {
        const { price, quantity, total, product } = req.body;
        const sale = await Sale.create({ price, quantity, total, product });
        await sale.save();
        const productToUpdate = await Product.findById(product);
        productToUpdate.stocks -= quantity;
        productToUpdate.price = price;
        await productToUpdate.save();
        return res.status(201).json(sale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};