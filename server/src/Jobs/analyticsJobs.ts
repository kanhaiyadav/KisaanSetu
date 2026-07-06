// jobs/analyticsJobs.js
import cron from "node-cron";
import analyticsService from "../services/analytics.js";

class AnalyticsJobs {
    // Run daily at 2 AM to process previous day's data
    startDailyAggregation() {
        cron.schedule("0 2 * * *", async () => {
            console.log("Starting daily analytics aggregation...");

            try {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                await analyticsService.saveDailyMetrics(yesterday);
                console.log("Daily aggregation completed successfully");
            } catch (error) {
                console.error("Daily aggregation failed:", error);
            }
        });
    }

    // Process last 7 days on startup (for backfill)
    async backfillRecentData() {
        console.log("Backfilling recent analytics data...");

        for (let i = 1; i <= 12; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            try {
                await analyticsService.saveDailyMetrics(date);
                console.log(
                    `Backfilled data for ${date.toISOString().split("T")[0]}`
                );
            } catch (error) {
                console.error(`Backfill failed for ${date}:`, error);
            }
        }
    }
}

export default new AnalyticsJobs();
