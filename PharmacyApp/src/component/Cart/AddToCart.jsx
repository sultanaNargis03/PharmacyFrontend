import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../helper/axios_helper";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddToCart = () => {
  const [medicine, setMedicine] = useState({
    medicineName: "",
    medicineComposition: "",
    medicinePrice: "",
    medicineQuantity: "",
    expiryDate: "",
  });

  const { medicineName } = useParams();
  const token = getAuthToken();

  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8088/Pharmacy/api/getmedicine/${medicineName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to fetch medicine:", error);
    }
  };

  const handleSubmit = async (e) => {
    // console.log(cart);
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8088/Pharmacy/api-cart/cart/${medicineName}`,
        JSON.stringify(medicine.medicineQuantity),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(medicineName + " Added to cart successfuly");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <h2>Add To Cart!!</h2>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Add to cart</button>
          <Link className="btn btn-link" to={"/cartlist"}>
            Go to cart
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddToCart;
