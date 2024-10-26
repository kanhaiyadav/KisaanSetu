import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: 'India'
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/128/16359/16359510.png'
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
    sales: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Sale'
        }
    ],
});

const Farmer = mongoose.model('Farmer', farmerSchema);
export default Farmer;