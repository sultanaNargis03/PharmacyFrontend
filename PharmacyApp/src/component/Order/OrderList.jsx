import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Link } from "react-router-dom";

const OrderList = () => {
  const [Orders, setOrders] = useState([]);

  const token = getAuthToken();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api-order/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(response.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col sm={{ size: 6, offset: 3 }}>
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
              <h3>Order Items</h3>
            </CardHeader>
            <CardBody>
              {Orders.length == 0 && (
                <div className="text-center text-white">
                  <h6>No order has been placed yet!!</h6>
                </div>
              )}
              <ListGroup flush>
                <Row>
                  {Orders.map((order) => (
                    <div key={order.id}>
                      <Card className="mb-4">
                        <CardBody>
                          <ListGroupItem>Id : {order.id}</ListGroupItem>
                          <ListGroupItem>
                            Medicine Name :
                            <ul>
                              {order.itemNames.map((name, index) => (
                                <li key={index}>{name}</li>
                              ))}
                            </ul>
                          </ListGroupItem>
                          <ListGroupItem>
                            Total Items: {order.totalItem}
                          </ListGroupItem>
                          <ListGroupItem>
                            Total Price: {order.totalPrice}
                          </ListGroupItem>
                        </CardBody>
                      </Card>
                    </div>
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
export default OrderList;
