import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const AddToCart = () => {
  const [medicine, setMedicine] = useState({
    medicineName: "",
    medicineComposition: "",
    medicinePrice: "",
    medicineQuantity: "",
    expiryDate: "",
  });

  const [cart, setCart] = useState({
    itemName: "",
    itemPrice: "",
    itemQuantity: "",
    user: [],
  });
  const handleChange = (e) => {
    setMedicine({ ...medicine, [e.target.name]: e.target.value });
  };

  const { medicineName } = useParams();

  const handleSubmit = async (e) => {
    // console.log(cart);
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8088/Pharmacy/api-cart/cart/${medicineName}`,
        medicine.medicineQuantity
      );
      setCart;
      console.alert(medicine);
    } catch (error) {
      console.error("Failed to add to cart:", error);
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
        </div>
      </form>
    </div>
  );
};

export default AddToCart;
