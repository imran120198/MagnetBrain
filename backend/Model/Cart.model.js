const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: String },
  image : {type : String},
  quantity: { type: Number, default: 1 },
});

const CartModel = mongoose.model("cart", CartSchema);

module.exports = {
  CartModel,
};
