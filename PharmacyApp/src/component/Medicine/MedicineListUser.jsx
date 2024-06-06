import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../helper/axios_helper";
import "../Medicine/SearchMedicine.css";

const MedicineListUser = () => {
  const [medicines, setMedicines] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api/medicine",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMedicines(response.data);
      setFilterData(response.data);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    }
  };
  const handleFilter = (event) => {
    setFilterData(
      medicines.filter((f) =>
        f.medicineName.toLowerCase().includes(event.target.value)
      )
    );
  };
  return (
    <div className="container mt-5">
      <div className="card h-100">
        <h2 className="card-title">Medicine list</h2>

        <div className="card-body">
          <div className="Search">
            <input
              type="text"
              onChange={handleFilter}
              placeholder="Search Here..."
            />
          </div>
          {filterData.map((medicine) => (
            <div key={medicine.id}>
              <div>Id : {medicine.id}</div>
              <div>Medicine Name : {medicine.medicineName}</div>
              <div>Medicine Composition : {medicine.medicineComposition}</div>
              <div>Medicine Quantity : {medicine.medicineQuantity}</div>
              <div>Medicine Price : {medicine.medicinePrice}</div>
              <div>Expiry Date : {medicine.expiryDate}</div>
              <Link
                className="btn btn-link"
                to={`/addtocart/${medicine.medicineName}`}
              >
                AddToCart
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MedicineListUser;
