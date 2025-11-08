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

const port = process.env.PORT || 3002;
const uri = process.env.MONGO_URL ;

const app = express();

// Allow requests from dashboard + client
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session handling for authentication
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
passport.use(new localstrategy(
  { usernameField: 'email' },
  UserModel.authenticate()
));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// --- GET holdings list ---
app.get('/allHoldings',async (req,res) =>{
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings)
});

// --- GET positions list ---
app.get('/allPositions',async (req,res) =>{
    let allPositions = await PositionsModel.find({});
    res.json(allPositions)
});

// --- Buy Order route ---
app.post('/newOrder', async (req, res) => {
  const instrumentId = req.body.name;
  const buyQuantity = parseFloat(req.body.qty);
  const buyPrice = parseFloat(req.body.price);
  const mode = req.body.mode;

  if (mode === "BUY") {
    try {
      // Save new buy order
      let newOrder = new OrdersModel({
        name: instrumentId,
        qty: buyQuantity,
        avg: buyPrice,
        price: buyPrice,
        mode: "BUY",
      });
      await newOrder.save();

      // Update holdings after buy
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

      return res.status(201).send("Order placed successfully and holdings updated.");
    } catch (error) {
      return res.status(500).send("Server error during BUY order processing.");
    }
  } else {
    return res.status(400).send("Invalid order mode for this route.");
  }
});

// --- Sell Order route ---
app.delete("/sellOrder", async (req, res) => {
  try {
    const instrumentId = req.query.name;
    const sellQuantity = parseFloat(req.query.qty);

    // Validate sell request
    if (!instrumentId || isNaN(sellQuantity) || sellQuantity <= 0) {
      return res.status(400).send("Stock name or valid quantity is missing in the request.");
    }

    // Delete order
    await OrdersModel.findOneAndDelete({ name: instrumentId });

    // Update holdings after sell
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

    return res.send("Sell order successful and holdings updated.");
  } catch (error) {
    return res.status(500).send("Internal Server Error: Failed to process sell and update holdings.");
  }
});

// --- GET orders list ---
app.get('/allOrders', async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({}).sort({ _id: -1 });
    res.json(allOrders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// --- Signup ---
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = new UserModel({ username, email });
    await UserModel.register(newUser, password);

    res.json({ message: "Signup successful!" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// --- Login ---
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

// --- Start server and DB connection ---
app.listen(port, () => {
    console.log("app started");
    mongoose.connect(uri);
    console.log("Db connected");
});