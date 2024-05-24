import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthToken } from "../../helper/axios_helper";

const OrderList = () => {
  const [Orders, setOrders] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api-order/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  return (
    <div>
      <h1>your order details</h1>
      <div>
        Order Items are:
        <ul>
          {Orders.map((order) => (
            <li>
              <div key={order.id}>
                <div>Id : {order.id}</div>
                <div>Medicine Name : {order.itemNames}</div>
                <div>Total Items: {order.totalItems}</div>
                <div>Total Price: {order.totalPrice}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default OrderList;
