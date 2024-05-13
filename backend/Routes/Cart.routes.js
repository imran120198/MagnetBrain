const { Router } = require("express");
const { CartModel } = require("../Model/Cart.model");

const CartRouter = Router();

CartRouter.get("/", async (req, res) => {
  try {
    const cart = await CartModel.find();
    res.send(cart);
  } catch (error) {
    res.send(error);
  }
});

CartRouter.post("/", async (req, res) => {
  try {
    const newCart = new CartModel(req.body);
    await newCart.save();
    res.send(newCart);
  } catch (error) {
    res.send(error);
  }
});

CartRouter.put("/:id/increase", async (req, res) => {
  try {
    const updateCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: 1 } },
      { new: true }
    );
    res.send(updateCart);
  } catch (err) {
    res.send(err);
  }
});

CartRouter.put("/:id/decrease", async (req, res) => {
  try {
    const updateCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: -1 } },
      { new: true }
    );
    res.send(updateCart);
  } catch (err) {
    res.send(err);
  }
});

module.exports = {
  CartRouter,
};
