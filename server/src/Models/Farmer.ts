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
        default: ''
    },
    banner: {
        type: String,
        default: ''
    },
});

const Farmer = mongoose.model('Farmer', farmerSchema);
export default Farmer;