import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const EditMedicine = () => {
  const [medicine, setMedicine] = useState({
    medicineName: "",
    medicineComposition: "",
    medicinePrice: "",
    medicineQuantity: "",
    expiryDate: "",
  });

  //const navigate = useNavigate();
  const { id } = useParams();
  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };
  const fetchMedicine = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8088/Pharmacy/api/medicine/${id}`
      );
      setMedicine(result.data);
    } catch (error) {
      console.error("Failed to fetch medicine data:", error);
    }
  };
  useEffect(() => {
    fetchMedicine();
  }, [id]);

  const handleSubmit = async (e) => {
    console.log(medicine);
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8088/Pharmacy/api/medicine/${id}`,
        medicine
      );
      //  navigate("/MedicineList");
    } catch (error) {
      console.error("Failed to add medicine:", error);
    }
  };
  return (
    <div>
      <h2>Update Medicine</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Id:</label>
            <input
              type="text"
              name="id"
              value={medicine.id}
              onChange={handleChange}
            />
          </div>
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
            <button type="submit">Update</button>
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
