const { Router } = require("express");
const stripe = require("stripe")(process.env.STRIPE);

const PaymentRouter = Router();

PaymentRouter.post("/:amount", async (req, res) => {
  try {
    const { amount } = req.params;
    const payment = await stripe.paymentIntents.create({
      amount: parseInt(amount),
      currency: "usd",
    });
    res.send(payment);
  } catch (err) {
    res.send(err);
  }
});

PaymentRouter.post('/checkout', async (req, res) => {
  try {
    const { products } = req.body;

    const lineItems = products.map((product) => ({
      price: product.id,
      quantity: product.quantity,
    }));

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success', // URL to redirect on successful payment
      cancel_url: 'http://localhost:3000/failure', // URL to redirect on cancelation
    });

    // Send the session ID back to the client
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(500).json({ error: 'An error occurred during checkout' });
  }
});


module.exports = {
  PaymentRouter,
};
