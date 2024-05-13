import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../Styles/Home.module.css";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios("https://fakestoreapi.com/products")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCart = (product) => {
    axios
      .post("http://localhost:8080/cart", product)
      .then((res) => {
        console.log(res.data);
        alert("Item Added to Cart");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <h1>Products</h1>
      </div>
      <div className={styles.productConatiner}>
        {data.map((elem) => {
          return (
            <div key={elem.id} className={styles.productCard}>
              <img
                className={styles.productImage}
                src={elem.image}
                alt={elem.title}
              />
              <p>{elem.title}</p>
              <p>{elem.description.substring(0, 60)}...</p>
              <p>Price : {elem.price}</p>
              <button
                onClick={() => handleCart(elem)}
                className={styles.productButton}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
