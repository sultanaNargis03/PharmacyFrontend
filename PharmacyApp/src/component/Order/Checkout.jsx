import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { getAuthToken } from "../../helper/axios_helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Spinner,
} from "reactstrap";
import { CartContext } from "../Cart/CartContext";

const Checkout = () => {
  const [checkouts, setCheckouts] = useState({});
  const [loading, setLoading] = useState(true);
  const token = getAuthToken();
  const { updateCartCount } = useContext(CartContext);

  useEffect(() => {
    console.log("Component mounted, fetching orders...");
    fetchOrders();
  }, []);

  const fetchCartCount = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api-cart/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateCartCount(response.data.length); // Update cart count in context
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api-order/checkout",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Your order has been placed successfully");
      setCheckouts(response.data);
      console.log(response.data);
      fetchCartCount();
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="mt-3 mb-3">
        <Col sm={{ size: 6, offset: 3 }}>
          <ToastContainer />
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "50vh",
                flexDirection: "column",
              }}
            >
              <Spinner color="dark" />
              <p
                style={{
                  marginTop: "20px",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "black",
                }}
              >
                Loading your order details...
              </p>
            </div>
          ) : (
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
                <h3>Your Order Details</h3>
              </CardHeader>
              <CardBody>
                <ListGroup flush>
                  <Row>
                    <Card className="mb-4">
                      <CardBody>
                        <ListGroupItem>
                          Your order has been successfully placed with order ID:
                          {checkouts.id}
                        </ListGroupItem>
                        <ListGroupItem>
                          Total Quantity: {checkouts.totalItem}
                        </ListGroupItem>
                        <ListGroupItem>
                          Total Price: {checkouts.totalPrice}
                        </ListGroupItem>
                        <ListGroupItem>
                          Order Items:
                          <ul>
                            {checkouts.itemNames &&
                              checkouts.itemNames.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                          </ul>
                        </ListGroupItem>
                      </CardBody>
                    </Card>
                  </Row>
                </ListGroup>
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
