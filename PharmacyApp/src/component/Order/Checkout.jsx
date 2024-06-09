import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../../helper/axios_helper";
import CustomNavbar from "../CustomNavbar";

const Checkout = () => {
  const [checkouts, setCheckouts] = useState([]);

  const token = getAuthToken();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api-order/checkout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCheckouts(response.data);
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    }
  };

  return (
    <div>
      <h1>your order details</h1>
      <div>
        <div>
          your Order has been sucessfully placed with order id: {checkouts.id}
        </div>
        <div>Total Quantity : {checkouts.totalItem}</div>
        <div>Total Price : {checkouts.totalPrice}</div>
        <div>
          Order Items are:
          <ul>
            {checkouts.itemNames &&
              checkouts.itemNames.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          {/* {checkouts.map((order) => (
            <div>{order.itemNames}</div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
export default Checkout;
