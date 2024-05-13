const express = require("express");

const cors = require("cors");

const { connection } = require("./Connection/Connection");
const { CartRouter } = require("./Routes/Cart.routes");
const { PaymentRouter } = require("./Routes/Payment.routes");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.send("Welcome to Server");
});

app.use("/cart", CartRouter);
app.use("/payment", PaymentRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (err) {
    console.log(err);
  }
  console.log("Running on PORT 8080");
});
