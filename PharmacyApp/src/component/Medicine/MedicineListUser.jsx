import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../helper/axios_helper";
import CustomNavbar from "../CustomNavbar";
import "react-toastify/dist/ReactToastify.css";
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
  ListGroupItem,
  ListGroup,
} from "reactstrap";
import { ToastContainer } from "react-toastify";

const MedicineListUser = () => {
  const [filterData, setFilterData] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const token = getAuthToken();

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api/medicine",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMedicines(response.data);
      setFilterData(response.data);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    }
  };

  const handleFilter = (event) => {
    setFilterData(
      medicines.filter((f) =>
        f.medicineName.toLowerCase().includes(event.target.value)
      )
    );
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col>
          <ToastContainer />
          <Card
            className="p-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "none",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardHeader className="fw-bolder text-white text-center">
              <h3>Medicine List</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Input
                    className="Search"
                    type="text"
                    onChange={handleFilter}
                    placeholder="Search Medicines"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  />
                </FormGroup>
              </Form>
              <ListGroup flush>
                <Row>
                  {filterData.map((medicine) => (
                    <Col md={6} key={medicine.id}>
                      <Card className="mb-4">
                        <CardBody>
                          <ListGroupItem>Id : {medicine.id}</ListGroupItem>
                          <ListGroupItem>
                            Medicine Name : {medicine.medicineName}
                          </ListGroupItem>
                          <ListGroupItem>
                            Medicine Composition :{" "}
                            {medicine.medicineComposition}
                          </ListGroupItem>
                          <ListGroupItem>
                            Medicine Quantity : {medicine.medicineQuantity}
                          </ListGroupItem>
                          <ListGroupItem>
                            Medicine Price : {medicine.medicinePrice}
                          </ListGroupItem>
                          <ListGroupItem>
                            Expiry Date : {medicine.expiryDate}
                          </ListGroupItem>
                          <ListGroupItem className="d-flex justify-content-between">
                            <Link
                              className="btn btn-link"
                              to={`/addtocart/${medicine.medicineName}`}
                              style={{
                                color: "#007bff",
                                backgroundColor: "black",
                                textDecoration: "none",
                              }}
                            >
                              Add To Cart
                            </Link>
                          </ListGroupItem>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MedicineListUser;
