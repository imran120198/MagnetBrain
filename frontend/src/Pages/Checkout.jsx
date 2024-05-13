import axios from "axios";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51P9LHQSHUXsAisoHrb3fLOLsGQaUN82V8zW1fK43hXZnoT318A6Wbg25xllNdDSARhRrC6d8kveikbgubsBFuCSs00heTH7eSE"
);

const Checkout = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios("http://localhost:8080/cart")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const stripeProductMapping = {
    1: "price_1NxJQmIIas9tFQMRj8ZjcIGL",
    2: "price_1NxJReIIas9tFQMRPt24m3g4",
    3: "price_1NxJS7IIas9tFQMR7H46sD79",
    4: "price_1NxJSVIIas9tFQMRUKKGB3LL",
    5: "price_1NxJT2IIas9tFQMRWy1aKb6v",
    6: "price_1NxJTRIIas9tFQMRr9k9Y4jF",
    7: "price_1NxJU1IIas9tFQMR9qz5jQYC",
    8: "price_1NxJUQIIas9tFQMR1JnGXNjX",
    9: "price_1NxJUzIIas9tFQMRrHubYQCE",
    10: "price_1NxJVnIIas9tFQMRgIthTrEa",
    11: "price_1NxJWoIIas9tFQMRISZB32DO",
    12: "price_1NxJXMIIas9tFQMRwpYzRAbi",
    13: "price_1NxJXiIIas9tFQMRYQUIJS2i",
    14: "price_1NxJYKIIas9tFQMRAcdQjJUC",
    15: "price_1NxJZRIIas9tFQMR8FqCTkRn",
    16: "price_1NxJa1IIas9tFQMR9fERzysb",
    17: "price_1NxJadIIas9tFQMRkwBc3Oid",
    18: "price_1NxJe9IIas9tFQMRnbaBY0wx",
    19: "price_1NxJeaIIas9tFQMRcRTCP49g",
    20: "price_1NxJeuIIas9tFQMROCyviUiG",
  };

  //calling backend using fetch
  const checkout = async () => {
    try {
      //map the products to use the stripe products IDs
      const productsForCheckout = products.map((product) => ({
        id: stripeProductMapping[product.id],
        quantity: product.quantity,
      }));
      const response = await fetch("http://localhost:8080/payment/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: productsForCheckout,
        }),
      });

      const data = await response.json();
      const sessionId = data.sessionId;

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Error redirecting to checkout:", error);
      }
    } catch (err) {
      console.log("Error during checkout:", err);
    }
  };

  let totalItem = 0;
  let shipping = 25;
  let subtotal = 0;

  products.map((elem) => (subtotal += elem.price * elem.quantity));
  products.map((elem) => (totalItem += elem.quantity));

  return (
    <div>
      <div>
        <h1>Checkout</h1>
        <div>
          <h3>Products : ${subtotal.toFixed(2)}</h3>
          <h3>Shipping Cost : ${shipping}</h3>
          <h3>Total Price : ${(subtotal + shipping).toFixed(2)}</h3>
          <button onClick={() => checkout()}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
