import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import React from "react";
import AddMedicine from "./component/AddMedicine";
import Home from "./component/Home";
import MedicineList from "./component/MedicineList";
import EditMedicine from "./component/EditMedicine";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";
import AddToCart from "./component/Cart/AddToCart";
import CartList from "./component/Cart/CartList";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
export default App;
