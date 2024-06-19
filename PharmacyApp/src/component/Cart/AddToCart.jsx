import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../helper/axios_helper";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
    if (!medicine.medicineQuantity) {
      toast.error("Please enter the medicine quantity");
      return; // Exit early if quantity is not provided
    }
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
    <Container>
      <Row className="mt-3 mb-3">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card
            className="p-4 text-white"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "none",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardHeader className="fw-bolder text-white text-center">
              <h3>Add to Cart</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="medicineQuantity">Medicine Quantity</Label>
                  <Input
                    type="number"
                    name="medicineQuantity"
                    value={medicine.medicineQuantity}
                    onChange={handleChange}
                    placeholder="Enter here"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  />
                </FormGroup>

                <Container className="text-center">
                  <Button
                    style={{
                      color: "green",
                      backgroundColor: "black",
                      textDecoration: "none",
                    }}
                    onClick={handleSubmit}
                  >
                    Add to cart
                  </Button>
                  <Link
                    style={{
                      color: "#007bff",
                      backgroundColor: "black",
                      textDecoration: "underline",
                    }}
                    className="btn btn-link ms-2"
                    to={"/cartlist"}
                  >
                    Go to cart
                  </Link>
                  <Link
                    style={{
                      color: "#007bff",
                      backgroundColor: "black",
                      textDecoration: "underline",
                    }}
                    className="btn btn-link ms-2"
                    to={"/medicinelistuser"}
                  >
                    Continue shopping
                  </Link>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AddToCart;
