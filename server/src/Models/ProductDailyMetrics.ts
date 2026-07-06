import mongoose from "mongoose";

const productDailyMetricsSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    metrics: {
        totalSold: { type: Number, default: 0 },
        revenue: { type: Number, default: 0 },
        uniqueBuyers: { type: Number, default: 0 },
        avgSellingPrice: { type: Number, default: 0 },
    },
    createdAt: { type: Date, default: Date.now },
});

productDailyMetricsSchema.index({ productId: 1, date: 1 }, { unique: true });
productDailyMetricsSchema.index({ sellerId: 1, date: 1 });

const ProductDailyMetrics = mongoose.model(
    "ProductDailyMetrics",
    productDailyMetricsSchema
);

export default ProductDailyMetrics;
