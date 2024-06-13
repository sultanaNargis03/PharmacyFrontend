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
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader>Medicine list</CardHeader>
            <CardBody>
              <Link className="btn btn-link" to={"/addmedicine"}>
                Add Medicine
              </Link>
              <Container>
                <Form>
                  <FormGroup>
                    <Input
                      className="Search"
                      type="text"
                      onChange={handleFilter}
                      placeholder="Search Medicines"
                    />
                  </FormGroup>
                </Form>
              </Container>

              <ListGroup flush>
                {filterData.map((medicine) => (
                  <div key={medicine.id}>
                    <Container className="mb-3">
                      <ListGroupItem>Id : {medicine.id}</ListGroupItem>
                      <ListGroupItem>
                        Medicine Name : {medicine.medicineName}
                      </ListGroupItem>
                      <ListGroupItem>
                        Medicine Composition : {medicine.medicineComposition}
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

                      {/* <Container className="text-center"> */}
                      <ListGroupItem>
                        <Button
                          color="danger"
                          type="submit"
                          onClick={() => deleteMedicine(medicine.id)}
                        >
                          Delete
                        </Button>
                        <Link
                          className="btn btn-link"
                          to={`/edit/${medicine.id}`}
                        >
                          Edit
                        </Link>
                      </ListGroupItem>
                      {/* </Container> */}
                    </Container>
                  </div>
                ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default MedicineListAdmin;
