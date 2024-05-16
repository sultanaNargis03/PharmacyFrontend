import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import AddMedicine from "./component/AddMedicinne";
import Home from "./component/Home";
import MedicineList from "./component/MedicineList";
import EditMedicine from "./component/EditMedicine";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/medicinelist" element={<MedicineList />} exact />
        <Route path="/addmedicine" element={<AddMedicine />} />
        <Route path="/edit/:id" element={<EditMedicine />} />
      </Routes>
    </Router>
  );
}
export default App;
