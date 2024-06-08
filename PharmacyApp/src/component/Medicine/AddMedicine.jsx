import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../helper/axios_helper";
import Navbar from "../Navbar";

const AddMedicine = () => {
  const [medicine, setMedicine] = useState({
    medicineName: "",
    medicineComposition: "",
    medicinePrice: "",
    medicineQuantity: "",
    expiryDate: "",
  });
  const token = getAuthToken();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log(medicine);
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8088/Pharmacy/api/medicine",
        // medicine
        JSON.stringify(medicine),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/MedicineListAdmin");
    } catch (error) {
      console.error("Failed to add medicine:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-8">
            <h2>Add Medicine</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Medicine Name:</label>
                <input
                  type="text"
                  name="medicineName"
                  value={medicine.medicineName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Medicine Composition:</label>
                <input
                  type="text"
                  name="medicineComposition"
                  value={medicine.medicineComposition}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Medicine Price:</label>
                <input
                  type="text"
                  name="medicinePrice"
                  value={medicine.medicinePrice}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Medicine Quantity:</label>
                <input
                  type="number"
                  name="medicineQuantity"
                  value={medicine.medicineQuantity}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Expiry Date:</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={medicine.expiryDate}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button className="btn btn-sm btn-success" type="submit">
                  Add Medicine
                </button>
              </div>
              {/* <div>
          <button type="reset">Clear</button>
        </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddMedicine;
