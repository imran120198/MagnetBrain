const { Router } = require("express");
const { CartModel } = require("../Model/Cart.model");

const CartRoute = Router();

// Get all items in the cart
CartRoute.get("/", async (req, res) => {
  try {
    const cart = await CartModel.find();
    res.send(cart);
  } catch (err) {
    res.send(err);
  }
});

// Add item to the cart
CartRoute.post("/", async (req, res) => {
  try {
    const newCart = new CartModel(req.body);
    await newCart.save();
    res.status(201).send({ message: "New Cart Added", cart: newCart });
  } catch (err) {
    console.error("Error adding cart:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Increase quantity of item in the cart
CartRoute.put("/:id/increase", async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: 1 } }, // Increment quantity by 1
      { new: true }
    );
    res.send(updatedCart);
  } catch (err) {
    console.error("Error increasing quantity:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Decrease quantity of item in the cart
CartRoute.put("/:id/decrease", async (req, res) => {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: -1 } }, // Decrement quantity by 1
      { new: true }
    );
    res.send(updatedCart);
  } catch (err) {
    console.error("Error decreasing quantity:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = {
  CartRoute,
};
