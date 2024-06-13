import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

import { ToastContainer, toast } from "react-toastify";

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
      toast.success("Medicine updated successfully");
      navigate("/MedicineListAdmin");
    } catch (error) {
      toast.erorr("something ent wrong!!");
      console.error("Failed to update medicine:", error);
    }
  };
  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader>
              <h3>Update Medicine</h3>
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
                    Update
                  </Button>
                  <Button
                    type="reset"
                    color="danger"
                    //onClick={handleReset}
                    outline
                    className="ms-2"
                  >
                    Reset
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
