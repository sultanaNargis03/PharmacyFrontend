import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../helper/axios_helper";
import CustomNavbar from "../CustomNavbar";

const MedicineListAdmin = () => {
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
  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/Pharmacy/api/medicine/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMedicines();
    } catch (error) {
      console.error("Failed to delete medicine:", error);
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="card h-100">
          <h2 className="card-title">Medicine list</h2>

          <Link className="btn btn-link" to={"/addmedicine"}>
            Add Medicine
          </Link>

          <div className="card-body">
            <div className="Search">
              <input
                type="text"
                onChange={handleFilter}
                placeholder="Search Medicines"
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

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteMedicine(medicine.id)}
                >
                  Delete
                </button>
                <Link className="btn btn-link" to={`/edit/${medicine.id}`}>
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MedicineListAdmin;
