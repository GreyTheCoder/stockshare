require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors")
const {HoldingsModel} = require('./models/HoldingsModel')
const {PositionsModel} = require('./models/PositionsModel');
const {OrdersModel} = require('./models/OrdersModel'); // Assuming OrdersModel exists

const port = process.env.port || 3002;
const uri = process.env.MONGO_URL ;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// --- GET Routes ---

app.get('/allHoldings',async (req,res) =>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings)
});

app.get('/allPositions',async (req,res) =>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions)
});

// --- POST/BUY Route (Holdings Aggregation) ---

app.post('/newOrder', async(req,res)=>{
    const instrumentId = req.body.name;
    const buyQuantity = parseFloat(req.body.qty);
    const buyPrice = parseFloat(req.body.price);
    const mode = req.body.mode;

    if (mode === "BUY") {
        try {
            // 1. Orders collection mein entry
            let newOrder = new OrdersModel ({
                name: instrumentId,
                qty: buyQuantity,
                avg: buyPrice, 
                price: buyPrice, 
                mode: "BUY",
            });
            await newOrder.save();

            // 2. Holdings collection mein aggregation/update
            const existingHolding = await HoldingsModel.findOne({ name: instrumentId });

            if (existingHolding) {
                const oldTotalValue = existingHolding.qty * existingHolding.avg;
                const newTradeValue = buyQuantity * buyPrice;
                const newTotalQuantity = existingHolding.qty + buyQuantity;
                const newAveragePrice = (oldTotalValue + newTradeValue) / newTotalQuantity;

                await HoldingsModel.updateOne(
                    { name: instrumentId },
                    { 
                        $set: { 
                            qty: newTotalQuantity, 
                            avg: newAveragePrice,
                            price: buyPrice 
                        } 
                    }
                );
            } else {
                await HoldingsModel.create({
                    name: instrumentId,
                    qty: buyQuantity,
                    avg: buyPrice,
                    price: buyPrice,
                    net: "N/A", 
                    day: "N/A"
                });
            }
            
            res.status(201).send("Order placed successfully and holdings updated.");

        } catch (error) {
            console.error(error);
            res.status(500).send("Server error during BUY order processing.");
        }
    } else {
        res.status(400).send("Invalid order mode for this route.");
    }
});

// --- DELETE/SELL Route (Holdings Update via Query Params) ---

app.delete("/sellOrder", async (req, res) => {
    try {
        // Query Parameters use kar rahe hain, jaisa ki humne troubleshoot kiya tha
        const instrumentId = req.query.name;
        const sellQuantity = parseFloat(req.query.qty); 

        // Validation
        if (!instrumentId || isNaN(sellQuantity) || sellQuantity <= 0) {
            return res.status(400).send("Stock name or valid quantity is missing in the request.");
        }

        // 1. OrdersModel se delete karein (Agar active hai)
        await OrdersModel.findOneAndDelete({ name: instrumentId });

        // 2. Holdings update karein
        const existingHolding = await HoldingsModel.findOne({ name: instrumentId });
        
        if (!existingHolding) {
             return res.status(400).send("Cannot sell: Stock is not present in your current holdings.");
        }

        const newQuantity = existingHolding.qty - sellQuantity;
            
        if (newQuantity > 0) {
            await HoldingsModel.updateOne(
                { name: instrumentId },
                { $set: { qty: newQuantity } }
            );
        } else if (newQuantity === 0) {
            await HoldingsModel.deleteOne({ name: instrumentId });
        } else {
             return res.status(400).send(`Cannot sell ${sellQuantity} qty. Only ${existingHolding.qty} available.`);
        }
        
        res.send("Sell order successful and holdings updated.");

    } catch (error) {
        console.error("Critical Error during SELL processing:", error.message);
        res.status(500).send("Internal Server Error: Failed to process sell and update holdings.");
    }
});

// Add this GET route to your existing index.js (near your other GET routes)
app.get('/allOrders', async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 }); // most recent first
    res.json(allOrders);
  } catch (err) {
    console.error("GET /allOrders error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// --- Server Start ---

app.listen(port, () => {
    console.log("aap started");
    mongoose.connect(uri);
    console.log("Db connected");
});