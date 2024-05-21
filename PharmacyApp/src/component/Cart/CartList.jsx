import axios from "axios";
import { useState, useEffect } from "react";

const CartList = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const token = localStorage.getItem("authToken");
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
      await axios.delete(`http://localhost:8088/Pharmacy/api-cart/cart/${id}`);

      fetchCarts();
    } catch (error) {
      console.error("Failed to remove cart:", error);
    }
  };
  return (
    <div>
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
    </div>
  );
};
export default CartList;
