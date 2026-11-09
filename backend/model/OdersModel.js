const { model } = require("mongoose");
const { OrdersSchema } = require("../schema/OrdersSchema");

const OdersModel = model("order", OrdersSchema);

module.exports = { OdersModel };