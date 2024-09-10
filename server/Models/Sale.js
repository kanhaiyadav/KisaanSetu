import mongoose from 'mongoose';

const SaleSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
});

const Sale = mongoose.model('Sale', SaleSchema);
export default Sale;