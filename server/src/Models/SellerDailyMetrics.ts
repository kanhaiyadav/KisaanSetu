// models/analytics/SellerDailyMetrics.ts
import mongoose, { Document, Schema, Model } from "mongoose";

// Define interface for TypeScript
export interface ISellerDailyMetrics extends Document {
    sellerId: mongoose.Schema.Types.ObjectId;
    date: Date;
    metrics: {
        totalSales: number;
        totalOrders: number;
        totalItems: number;
        avgOrderValue: number;
        uniqueCustomers: number;
    };
    topProducts: Array<{
        productId: mongoose.Schema.Types.ObjectId;
        productName: string;
        totalSold: number;
        revenue: number;
    }>;
    hourlyBreakdown: Array<{
        hour: number;
        sales: number;
        orders: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const sellerDailyMetricsSchema: Schema<ISellerDailyMetrics> =
    new mongoose.Schema(
        {
            sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
            date: { type: Date, required: true }, // YYYY-MM-DD format
            metrics: {
                totalSales: { type: Number, default: 0 },
                totalOrders: { type: Number, default: 0 },
                totalItems: { type: Number, default: 0 },
                avgOrderValue: { type: Number, default: 0 },
                uniqueCustomers: { type: Number, default: 0 },
            },
            topProducts: [
                {
                    productId: mongoose.Schema.Types.ObjectId,
                    productName: String,
                    totalSold: Number,
                    revenue: Number,
                },
            ],
            hourlyBreakdown: [
                {
                    hour: Number, // 0-23
                    sales: Number,
                    orders: Number,
                },
            ],
        },
        {
            timestamps: true, // This automatically adds createdAt and updatedAt
        }
    );

// Compound index for efficient queries
sellerDailyMetricsSchema.index({ sellerId: 1, date: 1 }, { unique: true });
sellerDailyMetricsSchema.index({ date: 1 });

// Create the model using the analytics database connection
const SellerDailyMetrics: Model<ISellerDailyMetrics> =
    mongoose.model<ISellerDailyMetrics>(
        "SellerDailyMetrics",
        sellerDailyMetricsSchema
    );

export default SellerDailyMetrics;