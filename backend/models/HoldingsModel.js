const { model } = require("mongoose");
const { HoldingSchema } = require("../schemas/HoldingsSchema");

const HoldingsModel = model("Holding", HoldingSchema);

module.exports = { HoldingsModel };
