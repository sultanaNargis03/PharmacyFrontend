// src/component/CartList.jsx
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { getAuthToken } from "../../helper/axios_helper";
import { Link } from "react-router-dom";
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
import { CartContext } from "./CartContext";
import { ToastContainer, toast } from "react-toastify";

const CartList = () => {
  const [carts, setCarts] = useState([]);
  const { updateCartCount } = useContext(CartContext);

  const token = getAuthToken();

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8088/Pharmacy/api-cart/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCarts(response.data);
      updateCartCount(response.data.length); // Update cart count in context
    } catch (error) {
      console.error("Failed to fetch carts:", error);
    }
  };

  const removeCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8088/Pharmacy/api-cart/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Cart removed successfully!!");
      fetchCarts();
    } catch (error) {
      console.error("Failed to remove cart:", error);
    }
  };

  return (
    <>
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
                <h3>Your Cart</h3>
              </CardHeader>
              <CardBody>
                {carts.length === 0 && (
                  <div className="text-center text-white">
                    <h5>Add items to your cart !!</h5>
                    <p>Your cart is empty</p>
                  </div>
                )}
                <ListGroup flush>
                  <Row>
                    {carts.map((c) => (
                      <div key={c.id}>
                        <Card className="mb-4">
                          <CardBody>
                            <ListGroupItem>Id : {c.id}</ListGroupItem>
                            <ListGroupItem>
                              Item Name : {c.itemName}
                            </ListGroupItem>
                            <ListGroupItem>
                              Item Quantity : {c.itemQuantity}
                            </ListGroupItem>
                            <ListGroupItem>
                              Item Price : {c.itemPrice}
                            </ListGroupItem>
                            <ListGroupItem className="d-flex justify-content-between">
                              <Button
                                color="danger"
                                type="submit"
                                onClick={() => removeCart(c.id)}
                                style={{
                                  color: "white",
                                  backgroundColor: "red",
                                  textDecoration: "none",
                                }}
                              >
                                Remove Cart
                              </Button>
                            </ListGroupItem>
                          </CardBody>
                        </Card>
                      </div>
                    ))}
                  </Row>
                </ListGroup>
                <Container className="mt-4">
                  <Button
                    tag={Link}
                    to={"/checkout"}
                    color="link"
                    disabled={carts.length === 0}
                    style={{
                      color: carts.length === 0 ? "grey" : "#007bff",
                      backgroundColor: "black",
                      textDecoration: "none",
                    }}
                  >
                    Checkout
                  </Button>
                </Container>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartList;
