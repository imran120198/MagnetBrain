const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  price: { type: Number },
  quantity: { type: Number, default: 1 },
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = {
  CartModel,
};
