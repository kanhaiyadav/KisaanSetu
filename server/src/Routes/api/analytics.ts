// routes/analytics.js
import { Router } from "express";
const router = Router();
import mongoose from "mongoose";

import SellerDailyMetrics from "@/Models/SellerDailyMetrics.js";

// Get seller overview for date range
router.get("/seller/:sellerId/overview", async (req, res) => {
    try {
        const { sellerId } = req.params;
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate || typeof startDate !== 'string' || typeof endDate !== 'string') {
            return res.status(400).json({ success: false, error: 'Valid startDate and endDate are required' });
        }

        const pipeline = [
            {
                $match: {
                    sellerId: new mongoose.Types.ObjectId(sellerId),
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            // {
            //     $group: {
            //         _id: null,
            //         totalSales: { $sum: "$metrics.totalSales" },
            //         totalOrders: { $sum: "$metrics.totalOrders" },
            //         totalItems: { $sum: "$metrics.totalItems" },
            //         uniqueCustomers: { $sum: "$metrics.uniqueCustomers" },
            //         dailyData: {
            //             $push: {
            //                 date: "$date",
            //                 sales: "$metrics.totalSales",
            //                 orders: "$metrics.totalOrders",
            //             },
            //         },
            //     },
            // },
            // {
            //     $addFields: {
            //         avgOrderValue: { $divide: ["$totalSales", "$totalOrders"] },
            //     },
            // },
        ];

        const result = await SellerDailyMetrics.aggregate(pipeline);

        res.json({
            success: true,
            data: result || {
                totalSales: 0,
                totalOrders: 0,
                totalItems: 0,
                uniqueCustomers: 0,
                avgOrderValue: 0,
                dailyData: [],
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get sales trend
router.get("/seller/:sellerId/trend", async (req, res) => {
    try {
        const { sellerId } = req.params;
        const { days = 30 } = req.query;

        const startDate = new Date();
        const daysNumber = typeof days === 'string' ? parseInt(days) : 30;
        startDate.setDate(startDate.getDate() - daysNumber);

        const trendData = await SellerDailyMetrics.find({
            sellerId: new mongoose.Types.ObjectId(sellerId),
            date: { $gte: startDate },
        })
            .select("date metrics.totalSales metrics.totalOrders")
            .sort({ date: 1 });

        res.json({
            success: true,
            data: trendData.map((item) => ({
                date: item.date,
                sales: item.metrics.totalSales,
                orders: item.metrics.totalOrders,
            })),
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

// Get top products for seller
router.get("/seller/:sellerId/top-products", async (req, res) => {
    try {
        const { sellerId } = req.params;
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate || typeof startDate !== 'string' || typeof endDate !== 'string') {
            return res.status(400).json({ success: false, error: 'Valid startDate and endDate are required' });
        }

        const result = await SellerDailyMetrics.aggregate([
            {
                $match: {
                    sellerId: new mongoose.Types.ObjectId(sellerId),
                    date: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            { $unwind: "$topProducts" },
            {
                $group: {
                    _id: "$topProducts.productId",
                    productName: { $first: "$topProducts.productName" },
                    totalSold: { $sum: "$topProducts.totalSold" },
                    revenue: { $sum: "$topProducts.revenue" },
                },
            },
            { $sort: { revenue: -1 } },
            { $limit: 10 },
        ]);

        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    }
});

export default router;
