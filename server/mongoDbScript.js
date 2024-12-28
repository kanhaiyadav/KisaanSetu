import Sale from "./Models/Sale.js";
import Farmer from "./Models/Farmer.js";
import Product from "./Models/Product.js";
import Consumer from "./Models/Consumer.js";
import mongoose from "mongoose";

// Async function to establish a database connection and perform operations
async function start() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb://localhost:27017/KisaanSetu");
        console.log("Database connection successful...");

        // Perform user updates inside the same function
        await Operation();
    } catch (err) {
        console.error('Problem connecting to the database', err);  // Connection error handling
    } finally {
        mongoose.connection.close(); // Close the connection after the operation
    }
}

// Function to update user statuses
async function Operation() {
    try {
        const farmers = await Farmer.find();
        for(let farmer of farmers) {
            if (farmer.sales)
            {
                farmer.sales = [];
                await farmer.save();
            }
        }
    } catch (error) {
        console.error('Error updating users:', error);
    }
}

// Call the start function to begin
start();
