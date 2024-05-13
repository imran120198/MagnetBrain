import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../Styles/Cart.module.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios("http://localhost:8080/cart")
      .then((res) => {
        setCart(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckout = (price) => {
    axios
      .post(`http://localhost:8080/payment/${price}`, {
        currency: "usd",
      })
      .then((res) => {
        console.log(res.data);
        navigate("/checkout");
      })
      .catch((err) => console.log(err));
  };

  const handleIncreaseQuantity = (id) => {
    axios
      .put(`http://localhost:8080/cart/${id}/increase`)
      .then((res) => {
        const updateCart = cart.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        setCart(updateCart);
      })
      .catch((err) => console.log(err));
  };

  const handleDecreaseQuantity = (id) => {
    axios
      .put(`http://localhost:8080/cart/${id}/decrease`)
      .then((res) => {
        const updateCart = cart.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCart(updateCart);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h1>Cart</h1>
      </div>
      <div className={styles.cartMain}>
        {cart.map((elem, index) => {
          return (
            <div className={styles.cartContainer}>
              <img
                src={elem.image}
                alt={elem.title}
                style={{ height: "200px", width: "200px" }}
              />
              <h3>{elem.title}</h3>
              <h3>{elem.price}</h3>
              <div className={styles.quantitySection}>
                <button onClick={() => handleIncreaseQuantity(elem._id)}>
                  +
                </button>
                <p>{elem.quantity}</p>
                <button onClick={() => handleDecreaseQuantity(elem._id)}>
                  -
                </button>
              </div>
              <button
                onClick={() => handleCheckout(elem.price * elem.quantity)}
                className={styles.cartButton}
              >
                Checkout
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
