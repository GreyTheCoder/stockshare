const { model } = require("mongoose");
const { OrdersSchema } = require("../schemas/OrdersSchema");

const OrdersModel = model("Orders", OrdersSchema);

module.exports = { OrdersModel };
