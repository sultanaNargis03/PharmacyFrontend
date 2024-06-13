import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../helper/axios_helper";
import {
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Col,
  Container,
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  FormFeedback,
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
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
        // medicine
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
      toast.erorr("something ent wrong!!");
      console.error("Failed to add medicine:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader>
              <h3>Add Medicine</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="medicineName">Medicine Name</Label>

                  <Input
                    type="text"
                    name="medicineName"
                    value={medicine.medicineName}
                    onChange={handleChange}
                    placeholder="Enter Here..."
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicineComposition">Medicine Composition</Label>

                  <Input
                    type="text"
                    name="medicineComposition"
                    value={medicine.medicineComposition}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicinePrice">Medicine Price</Label>

                  <Input
                    type="text"
                    name="medicinePrice"
                    value={medicine.medicinePrice}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="medicineQuantity">Medicine Quantity</Label>

                  <Input
                    type="number"
                    name="medicineQuantity"
                    value={medicine.medicineQuantity}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="expiryDate">Expiry Date</Label>

                  <Input
                    type="date"
                    name="expiryDate"
                    value={medicine.expiryDate}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button
                    color="success"
                    outline
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add Medicine
                  </Button>
                  <Button
                    type="reset"
                    color="danger"
                    //onClick={handleReset}
                    outline
                    className="ms-2"
                  >
                    Reset Content
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
