import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api/medicine"
      );
      setMedicines(response.data);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    }
  };

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/Pharmacy/api/medicine/${id}`);

      fetchMedicines();
    } catch (error) {
      console.error("Failed to delete medicine:", error);
    }
  };

  return (
    <div>
      <h2>Medicine list</h2>
      <Link to={"/addmedicine"}>Add Medicine</Link>
      <div>
        {medicines.map((medicine) => (
          <div key={medicine.id}>
            <div>Id : {medicine.id}</div>
            <div>Medicine Name : {medicine.medicineName}</div>
            <div>Medicine Composition : {medicine.medicineComposition}</div>
            <div>Medicine Quantity : {medicine.medicineQuantity}</div>
            <div>Medicine Price : {medicine.medicinePrice}</div>
            <div>Expiry Date : {medicine.expiryDate}</div>

            <button onClick={() => deleteMedicine(medicine.id)}>Delete</button>
            <Link to={`/edit/${medicine.id}`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MedicineList;
