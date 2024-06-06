import { useState } from "react";
import { getAuthToken } from "../../helper/axios_helper";
import "../Medicine/SearchMedicine.css";

const SearchMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const token = getAuthToken();
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8088/Pharmacy/api/getmedicine/${medicineName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFilterData(response.data);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    }
  };

  const handleFilter = (value) => {
    const res = filterData.filter((f) => f.name.toLowerCase().includes(value));
    setMedicines(res);
  };

  return (
    <div class="Search">
      <input
        type="text"
        placeholder="Search Here..."
        onChange={(e) => handleFilter(e.target.value)}
      />
    </div>
  );
};
export default SearchMedicine;
