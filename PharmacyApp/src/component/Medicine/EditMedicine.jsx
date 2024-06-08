import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../helper/axios_helper";
import Navbar from "../Navbar";

const EditMedicine = () => {
  const [medicine, setMedicine] = useState({
    medicineName: "",
    medicineComposition: "",
    medicinePrice: "",
    medicineQuantity: "",
    expiryDate: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const token = getAuthToken();

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8088/Pharmacy/api/medicine/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMedicine({
        ...medicine,
        medicineName: response.data.medicineName,
        medicineComposition: response.data.medicineComposition,
        medicineQuantity: response.data.medicineQuantity,
        medicinePrice: response.data.medicinePrice,
        expiryDate: response.data.expiryDate,
      });
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    }
  };
  const handleSubmit = async (e) => {
    console.log(medicine);
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8088/Pharmacy/api/update-medicine/${id}`,
        JSON.stringify(medicine),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(medicine);
      navigate("/MedicineListAdmin");
    } catch (error) {
      console.error("Failed to update medicine:", error);
    }
  };
  return (
    <div>
      <Navbar />
      <h2>Update Medicine</h2>
      <div>
        <form onSubmit={handleSubmit}>
          {/* <div>
            <label>Id:</label>
            <input
              type="text"
              name="id"
              value={medicine.id}
              //placeholder="ID"
              onChange={handleChange}
            />
          </div> */}
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
            <button className="btn btn-sm btn-dark" type="submit">
              Update
            </button>
          </div>
          {/* <div>
          <button type="reset">Clear</button>
        </div> */}
        </form>
      </div>
    </div>
  );
};
export default EditMedicine;
