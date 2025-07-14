import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    consumer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Consumer'
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;