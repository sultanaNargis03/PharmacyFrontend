import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../helper/axios_helper";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure you import the CSS for toast notifications

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
      toast.success("Medicine updated successfully");
      navigate("/MedicineListAdmin");
    } catch (error) {
      toast.error("Failed to update medicine");
      console.error("Failed to update medicine:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card
            className=" p-4 text-white"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "none",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardHeader className="fw-bolder text-white text-center">
              <h3>Update Medicine</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="medicineName">
                    Medicine Name <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                    type="text"
                    name="medicineName"
                    value={medicine.medicineName}
                    onChange={handleChange}
                    required
                    placeholder="Enter Here..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicineComposition">
                    Medicine Composition <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                    type="text"
                    name="medicineComposition"
                    value={medicine.medicineComposition}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicinePrice">
                    Medicine Price <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                    type="text"
                    name="medicinePrice"
                    value={medicine.medicinePrice}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicineQuantity">
                    Medicine Quantity <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                    type="number"
                    name="medicineQuantity"
                    value={medicine.medicineQuantity}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="expiryDate">
                    Expiry Date <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                    type="date"
                    name="expiryDate"
                    value={medicine.expiryDate}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button
                    style={{
                      color: "black",
                      backgroundColor: "green",
                      textDecoration: "none",
                    }}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditMedicine;
