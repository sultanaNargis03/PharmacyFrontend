import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";

import AddMedicine from "./component/Medicine/AddMedicine";
import MedicineList from "./component/Medicine/MedicineListAdmin";
import EditMedicine from "./component/Medicine/EditMedicine";

import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";

import AddToCart from "./component/Cart/AddToCart";
import CartList from "./component/Cart/CartList";

import Checkout from "./component/Order/Checkout";
import OrderList from "./component/Order/OrderList";

import Footer from "./component/Footer";
import Sidebar from "./component/Sidebar";
import CustomNavbar from "./component/CustomNavbar";
import Welcome from "./component/Welcome";
import Home from "./component/Home";

import MedicineListAdmin from "./component/Medicine/MedicineListAdmin";
import MedicineListUser from "./component/Medicine/MedicineListUser";
import SessionExpired from "./component/Auth/SessionExpired";
import { CartProvider } from "./component/Cart/CartContext";

function App() {
  return (
    <BrowserRouter>
      <CustomNavbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome />} exact />
        <Route path="/home" element={<Home />} exact />
        <Route path="/navbar" element={<CustomNavbar />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/sessionexpired" element={<SessionExpired />} exact />

        <Route
          path="/medicinelistadmin"
          element={<MedicineListAdmin />}
          exact
        />
        <Route path="/medicinelistuser" element={<MedicineListUser />} exact />
        <Route path="/addmedicine" element={<AddMedicine />} />
        <Route path="/edit/:id" element={<EditMedicine />} />
        <Route path="/addtocart/:medicineName/*" element={<AddToCart />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderlist" element={<OrderList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
