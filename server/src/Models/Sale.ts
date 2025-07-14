import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    priceUnit: {
        type: String,
        enum: ["kg", "g", "pc", "dz", "tonne", "pkt", "carton"],
        required: true,
    },
    stocksUnit: {
        type: String,
        enum: ["kg", "g", "pc", "dz", "tonne", "pkt", "carton"],
        required: true,
    },
    customer: {
        type: String,
        ref: "Consumer",
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});

const Sale = mongoose.model('Sale', SaleSchema);
export default Sale;