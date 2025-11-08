require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const { HoldingsModel } = require('./models/HoldingsModel');
const { PositionsModel } = require('./models/PositionsModel');
const { OrdersModel } = require('./models/OrdersModel');
const { UserModel } = require('./models/UserModel');

const app = express();

// ✅ Use dynamic port for Render
const PORT = process.env.PORT || 3002;

// ✅ MongoDB URI from environment variable
const MONGO_URI = process.env.MONGO_URL;

// --- Middleware ---
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ CORS: Allow frontend + dashboard deployed URLs
app.use(cors({
  origin: [
    "https://your-frontend.netlify.app",
    "https://your-dashboard.netlify.app"
  ],
  credentials: true,
}));

// ✅ Session handling
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({ usernameField: 'email' }, UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// --- Routes ---

// GET all holdings
app.get('/allHoldings', async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// GET all positions
app.get('/allPositions', async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// Buy order
app.post('/newOrder', async (req, res) => {
  const { name, qty, price, mode } = req.body;
  const buyQuantity = parseFloat(qty);
  const buyPrice = parseFloat(price);

  if (mode !== "BUY") return res.status(400).send("Invalid order mode for this route.");

  try {
    const newOrder = new OrdersModel({ name, qty: buyQuantity, avg: buyPrice, price: buyPrice, mode });
    await newOrder.save();

    const existingHolding = await HoldingsModel.findOne({ name });
    if (existingHolding) {
      const oldTotalValue = existingHolding.qty * existingHolding.avg;
      const newTradeValue = buyQuantity * buyPrice;
      const newTotalQty = existingHolding.qty + buyQuantity;
      const newAvg = (oldTotalValue + newTradeValue) / newTotalQty;

      await HoldingsModel.updateOne({ name }, { $set: { qty: newTotalQty, avg: newAvg, price: buyPrice } });
    } else {
      await HoldingsModel.create({ name, qty: buyQuantity, avg: buyPrice, price: buyPrice, net: "N/A", day: "N/A" });
    }

    res.status(201).send("Order placed successfully and holdings updated.");
  } catch (err) {
    res.status(500).send("Server error during BUY order processing.");
  }
});

// Sell order
app.delete("/sellOrder", async (req, res) => {
  try {
    const { name, qty } = req.query;
    const sellQuantity = parseFloat(qty);

    if (!name || isNaN(sellQuantity) || sellQuantity <= 0) {
      return res.status(400).send("Stock name or valid quantity missing.");
    }

    await OrdersModel.findOneAndDelete({ name });

    const existingHolding = await HoldingsModel.findOne({ name });
    if (!existingHolding) return res.status(400).send("Cannot sell: Stock not in holdings.");

    const newQty = existingHolding.qty - sellQuantity;

    if (newQty > 0) {
      await HoldingsModel.updateOne({ name }, { $set: { qty: newQty } });
    } else if (newQty === 0) {
      await HoldingsModel.deleteOne({ name });
    } else {
      return res.status(400).send(`Cannot sell ${sellQuantity}. Only ${existingHolding.qty} available.`);
    }

    res.send("Sell order successful and holdings updated.");
  } catch (err) {
    res.status(500).send("Internal Server Error: Failed to process sell.");
  }
});

// GET all orders
app.get('/allOrders', async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: "All fields are required" });

    const newUser = new UserModel({ username, email });
    await UserModel.register(newUser, password);
    res.json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(500).json({ message: "Internal Server Error" });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: "Login failed!" });
      return res.json({ message: "Login successful!" });
    });
  })(req, res, next);
});

// --- Connect to DB first, then start server ---
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("DB connection error:", err));
