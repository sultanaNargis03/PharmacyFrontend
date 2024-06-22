import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../helper/axios_helper";

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

import { toast } from "react-toastify";
import CustomNavbar from "../CustomNavbar";

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
        JSON.stringify(medicine),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Medicine added successfully");
      navigate("/MedicineListAdmin");
    } catch (error) {
      toast.error("Something went wrong!!");
      console.error("Failed to add medicine:", error);
    }
  };

  return (
    <Container className="mt-3 mb-3">
      <Row>
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
              <h3>Add Medicine</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="medicineName">
                    Medicine Name <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="medicineName"
                    value={medicine.medicineName}
                    onChange={handleChange}
                    required
                    placeholder="Enter Here..."
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicineComposition">
                    Medicine Composition <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="medicineComposition"
                    value={medicine.medicineComposition}
                    onChange={handleChange}
                    required
                    placeholder="Enter Here..."
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicinePrice">
                    Medicine Price <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="text"
                    name="medicinePrice"
                    value={medicine.medicinePrice}
                    onChange={handleChange}
                    required
                    placeholder="Enter Here..."
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicineQuantity">
                    Medicine Quantity <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="number"
                    name="medicineQuantity"
                    value={medicine.medicineQuantity}
                    onChange={handleChange}
                    required
                    placeholder="Enter Here..."
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="expiryDate">
                    Expiry Date <span style={{ color: "red" }}>*</span>
                  </Label>
                  <Input
                    type="date"
                    name="expiryDate"
                    value={medicine.expiryDate}
                    onChange={handleChange}
                    required
                    placeholder="Enter Here..."
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      color: "#000",
                    }}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    style={{
                      color: "black",
                      backgroundColor: "green",
                      textDecoration: "none",
                    }}
                  >
                    Add Medicine
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

export default AddMedicine;
