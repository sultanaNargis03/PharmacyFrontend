import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getAuthToken } from "../../helper/axios_helper";
import CustomNavbar from "../CustomNavbar";
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

const MedicineListAdmin = () => {
  const [medicines, setMedicines] = useState([]);
  const [filterData, setFilterData] = useState([]);
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

  const deleteMedicine = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/Pharmacy/api/medicine/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMedicines();
    } catch (error) {
      console.error("Failed to delete medicine:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col>
          <Card
            className="p-4"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              border: "none",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardHeader className="fw-bolder text-white">
              <h3>Medicine List</h3>
            </CardHeader>
            <CardBody>
              <Link
                className="btn btn-link mb-3 text-primary "
                to={"/addmedicine"}
                style={{
                  color: "#007bff",
                  backgroundColor: "black",
                  textDecoration: "underline",
                }}
              >
                Add Medicine
              </Link>

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
                            <Button
                              color="danger"
                              type="submit"
                              onClick={() => deleteMedicine(medicine.id)}
                              style={{
                                color: "white",
                                backgroundColor: "red",
                                textDecoration: "none",
                              }}
                            >
                              Delete
                            </Button>
                            <Link
                              className="btn btn-link"
                              to={`/edit/${medicine.id}`}
                              style={{
                                color: "#007bff",
                                backgroundColor: "black",
                                textDecoration: "underline",
                              }}
                            >
                              Edit
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

export default MedicineListAdmin;
