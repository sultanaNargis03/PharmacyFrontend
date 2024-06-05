import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import Home from "./component/Home";
import AddMedicine from "./component/Medicine/AddMedicine";
import MedicineList from "./component/Medicine/MedicineList";
import EditMedicine from "./component/Medicine/EditMedicine";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";
import AddToCart from "./component/Cart/AddToCart";
import CartList from "./component/Cart/CartList";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Checkout from "./component/Order/Checkout";
import OrderList from "./component/Order/OrderList";
import Decode from "./component/Auth/Decode";
import AdminHome from "./component/AdminHome";
import UserHome from "./component/UserHome";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} exact />
        {/* <Route path="/navbar" element={<Navbar />} exact /> */}
        <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/medicinelist" element={<MedicineList />} exact />
        <Route path="/addmedicine" element={<AddMedicine />} />
        <Route path="/edit/:id" element={<EditMedicine />} />
        <Route path="/addtocart/:medicineName" element={<AddToCart />} />
        <Route path="/cartlist" element={<CartList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/decode" element={<Decode />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
