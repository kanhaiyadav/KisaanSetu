import mongoose from "mongoose";

const consumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/128/16359/16359510.png'
    },
});

const Consumer = mongoose.model('Consumer', consumerSchema);
export default Consumer;