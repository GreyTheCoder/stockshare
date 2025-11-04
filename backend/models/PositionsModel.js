const { model } = require("mongoose");
const { PositionsSchema } = require("../schemas/PositionsSchema");

const PositionsModel = model("Positions", PositionsSchema);

module.exports = { PositionsModel };
