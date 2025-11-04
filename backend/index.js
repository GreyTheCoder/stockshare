require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors")
const {HoldingsModel} = require('./models/HoldingsModel')
const {PositionsModel} = require('./models/PositionsModel');
const {OrdersModel} = require('./models/OrdersModel'); 
const session = require('express-session');
const passport = require('passport');
const localstrategy = require('passport-local');
const {UserModel} = require('./models/UserModel');


const port = process.env.port || 3002;
const uri = process.env.MONGO_URL ;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const sessionOptions = {
    secret: "99665544332211",
    resave: false,
    saveUninitialized: true,
    cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// Add this route to return and clear flash messages for current session
// Place it after app.use(flash()) and before other routes or near other GET routes



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

// Replace your existing POST /newOrder handler with this:
// Replace your current POST /newOrder (flash version) with this original "no-flash" handler:

app.post('/newOrder', async (req, res) => {
  const instrumentId = req.body.name;
  const buyQuantity = parseFloat(req.body.qty);
  const buyPrice = parseFloat(req.body.price);
  const mode = req.body.mode;

  if (mode === "BUY") {
    try {
      // 1. Orders collection entry
      let newOrder = new OrdersModel({
        name: instrumentId,
        qty: buyQuantity,
        avg: buyPrice,
        price: buyPrice,
        mode: "BUY",
      });
      await newOrder.save();

      // 2. Holdings aggregation/update
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
              price: buyPrice,
            },
          }
        );
      } else {
        await HoldingsModel.create({
          name: instrumentId,
          qty: buyQuantity,
          avg: buyPrice,
          price: buyPrice,
          net: "N/A",
          day: "N/A",
        });
      }

      // Respond directly (no flash)
      return res.status(201).send("Order placed successfully and holdings updated.");
    } catch (error) {
      console.error("Server error during BUY order processing:", error);
      return res.status(500).send("Server error during BUY order processing.");
    }
  } else {
    return res.status(400).send("Invalid order mode for this route.");
  }
});

// --- DELETE/SELL Route (Holdings Update via Query Params) ---

// Replace your existing DELETE /sellOrder handler with this:

// Replace your current DELETE /sellOrder (flash version) with this original "no-flash" handler:

app.delete("/sellOrder", async (req, res) => {
  try {
    const instrumentId = req.query.name;
    const sellQuantity = parseFloat(req.query.qty);

    // Validation
    if (!instrumentId || isNaN(sellQuantity) || sellQuantity <= 0) {
      return res.status(400).send("Stock name or valid quantity is missing in the request.");
    }

    // Delete matching order entry (if any)
    await OrdersModel.findOneAndDelete({ name: instrumentId });

    // Update holdings
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

    // Respond directly (no flash)
    return res.send("Sell order successful and holdings updated.");
  } catch (error) {
    console.error("Critical Error during SELL processing:", error.message);
    return res.status(500).send("Internal Server Error: Failed to process sell and update holdings.");
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

// --- AUTH ROUTES ---
// 🧠 Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new UserModel({ email, username });
    await UserModel.register(newUser, password); // provided by passport-local-mongoose

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// 🔐 Login Route
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login successful!" });
});

// --- Server Start ---

app.listen(port, () => {
    console.log("aap started");
    mongoose.connect(uri);
    console.log("Db connected");
});