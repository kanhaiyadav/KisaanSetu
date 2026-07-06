import Sales from "@/Models/Sale.js";
import SellerDailyMetrics from "@/Models/SellerDailyMetrics.js";

class AnalyticsService {
    // Aggregate daily metrics for all sellers
    async aggregateDailySellerMetrics(targetDate) {
        const startDate = new Date(targetDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(targetDate);
        endDate.setHours(23, 59, 59, 999);

        const pipeline = [
            // Match sales for the target date
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                    status: "completed",
                },
            },

            // Lookup product details
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product",
                },
            },

            // Unwind product array
            { $unwind: "$product" },

            // Group by seller and calculate metrics
            {
                $group: {
                    _id: "$sellerId",
                    totalSales: { $sum: "$totalAmount" },
                    totalOrders: { $sum: 1 },
                    totalItems: { $sum: "$quantity" },
                    uniqueCustomers: { $addToSet: "$buyerId" },

                    // Product performance - simplified approach
                    productMetrics: {
                        $push: {
                            productId: "$productId",
                            productName: "$product.name",
                            quantity: "$quantity",
                            revenue: "$totalAmount",
                        },
                    },

                    // Hourly breakdown
                    hourlySales: {
                        $push: {
                            hour: { $hour: "$createdAt" },
                            amount: "$totalAmount",
                        },
                    },
                },
            },

            // Calculate derived metrics
            {
                $addFields: {
                    avgOrderValue: { $divide: ["$totalSales", "$totalOrders"] },
                    uniqueCustomers: { $size: "$uniqueCustomers" },
                },
            },

            // Process hourly breakdown first (simpler operation)
            {
                $addFields: {
                    hourlyBreakdown: {
                        $map: {
                            input: { $range: [0, 24] },
                            as: "hour",
                            in: {
                                hour: "$$hour",
                                sales: {
                                    $sum: {
                                        $map: {
                                            input: {
                                                $filter: {
                                                    input: "$hourlySales",
                                                    cond: {
                                                        $eq: [
                                                            "$$this.hour",
                                                            "$$hour",
                                                        ],
                                                    },
                                                },
                                            },
                                            in: "$$this.amount",
                                        },
                                    },
                                },
                                orders: {
                                    $size: {
                                        $filter: {
                                            input: "$hourlySales",
                                            cond: {
                                                $eq: ["$$this.hour", "$$hour"],
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        ];

        // Get the basic aggregation first
        const basicResults = await Sales.aggregate(pipeline);

        // Process top products separately to avoid complex nested operations
        const resultsWithTopProducts = basicResults.map((result) => {
            // Group products by productId and sum their metrics
            const productMap = new Map();

            result.productMetrics.forEach((product) => {
                const key = product.productId.toString();
                if (productMap.has(key)) {
                    const existing = productMap.get(key);
                    existing.totalSold += product.quantity;
                    existing.revenue += product.revenue;
                } else {
                    productMap.set(key, {
                        productId: product.productId,
                        productName: product.productName,
                        totalSold: product.quantity,
                        revenue: product.revenue,
                    });
                }
            });

            // Convert to array and sort by revenue
            const topProducts = Array.from(productMap.values())
                .sort((a, b) => b.revenue - a.revenue)
                .slice(0, 5);

            // Remove the temporary productMetrics field and add topProducts
            const { productMetrics, ...cleanResult } = result;
            return {
                ...cleanResult,
                topProducts,
            };
        });

        return resultsWithTopProducts;
    }

    // Save aggregated data to analytics collections
    async saveDailyMetrics(date) {

        try {
            // Use the hybrid approach by default (more reliable)
            const aggregatedData = await this.aggregateDailySellerMetrics(date);

            const operations = aggregatedData.map((data) => ({
                updateOne: {
                    filter: {
                        sellerId: data._id,
                        date: new Date(date.toISOString().split("T")[0]),
                    },
                    update: {
                        $set: {
                            sellerId: data._id,
                            date: new Date(date.toISOString().split("T")[0]),
                            metrics: {
                                totalSales: data.totalSales || 0,
                                totalOrders: data.totalOrders || 0,
                                totalItems: data.totalItems || 0,
                                avgOrderValue: data.avgOrderValue || 0,
                                uniqueCustomers: data.uniqueCustomers || 0,
                            },
                            topProducts: data.topProducts || [],
                            hourlyBreakdown: data.hourlyBreakdown || [],
                            updatedAt: new Date(),
                        },
                    },
                    upsert: true,
                },
            }));

            if (operations.length > 0) {
                await SellerDailyMetrics.bulkWrite(operations);
            }

            console.log(
                `Processed ${operations.length} sellers for date: ${date}`
            );
        } catch (error) {
            console.error("Error saving daily metrics:", error);
            throw error;
        }
    }
}

export default new AnalyticsService();
