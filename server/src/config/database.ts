import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

main().catch(err => console.log(err));

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/KisaanSetu');
        console.log("Database connection successful...");  // Connection success message
    } catch (err) {
        console.error('Problem connecting to the database', err);  // Connection error handling
    }
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}