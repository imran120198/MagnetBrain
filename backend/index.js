const express = require("express");
const cors = require("cors");

const { connection } = require("./Connection/Connection");
const { CartRoute } = require("./Routes/Cart.routes");
const { PaymentRoute } = require("./Routes/Payment.routes");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Welcome to React E-Commerce server");
});

app.use("/cart", CartRoute);
app.use("/payment", PaymentRoute);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(err);
  }
  console.log("Listing to PORT 8080");
});
