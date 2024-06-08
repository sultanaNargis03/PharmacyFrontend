import axios from "axios";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../helper/axios_helper";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const CartList = () => {
  const [carts, setCarts] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api-cart/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCarts(response.data);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    }
  };

  const removeCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/Pharmacy/api-cart/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCarts();
    } catch (error) {
      console.error("Failed to remove cart:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <h1>your Cart</h1>
      <div>
        {carts.map((c) => (
          <div key={c.id}>
            <div>Id : {c.id}</div>
            <div>Item Name : {c.itemName}</div>
            <div>Item Quantity : {c.itemQuantity}</div>
            <div>Item Price : {c.itemPrice}</div>
            <button onClick={() => removeCart(c.id)}>Remove</button>
          </div>
        ))}
      </div>
      <Link className="btn btn-link" to={"/checkout"}>
        checkout
      </Link>
    </div>
  );
};
export default CartList;
