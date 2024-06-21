import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuthHeader } from "../../helper/axios_helper";

import { ToastContainer, toast } from "react-toastify";
import { isLoggedIn, setCurrentUserRole } from "./Auth";
import { AuthContext } from "./AuthContext";
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
  CardTitle,
} from "reactstrap";
import { CartContext } from "../Cart/CartContext";

const Login = () => {
  const [loginDto, setLoginDto] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { updateCartCount } = useContext(CartContext); // Use CartContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (loginDto.username.trim() === "" || loginDto.password.trim() === "") {
        toast.error("Username or password is required");
        return;
      }
      const response = await axios.post(
        "http://localhost:8088/Pharmacy/api/auth/login",
        loginDto
      );

      toast.success("Login successful");
      localStorage.setItem("data", JSON.stringify(response.data));
      setAuthHeader(response.data.accessToken);
      setCurrentUserRole(response.data.role);
      fetchCartDetails(response.data.accessToken);
      login();

      navigate("/home");
    } catch (error) {
      console.error("Failed to login:", error);
      toast.error("Invalid username or password");
    }
  };

  const handleChange = (e) => {
    setLoginDto({ ...loginDto, [e.target.name]: e.target.value });
  };

  const fetchCartDetails = async (token) => {
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
      console.error("Failed to fetch cart details:", error);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse className="p-4">
            <CardHeader className="text-center mb-2">
              <h3>Welcome back!</h3>
              <h6>We are so excited to see you again!</h6>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <Col sm={6}>
                    <FormGroup>
                      <Label
                        for="username"
                        style={{
                          textAlign: "left",
                          display: "block",
                          fontSize: 15,
                        }}
                      >
                        USER NAME <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        type="text"
                        name="username"
                        value={loginDto.username}
                        placeholder="Enter Here..."
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label
                        for="password"
                        style={{
                          textAlign: "left",
                          display: "block",
                          fontSize: 15,
                        }}
                      >
                        PASSWORD <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Input
                        type="password"
                        name="password"
                        value={loginDto.password}
                        placeholder="Enter Here..."
                        onChange={handleChange}
                        required
                      />
                    </FormGroup>

                    <Button
                      className="mt-3"
                      color="primary"
                      type="submit"
                      style={{ width: "100%" }}
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>

                    <Container
                      style={{ textAlign: "left", display: "block" }}
                      className="mt-2 mb-2"
                    >
                      <span>Need an account yet?</span>
                      <Link className="btn btn-link" to={"/register"}>
                        Sign Up
                      </Link>
                    </Container>
                  </Col>
                  <Col sm={6} className="text-center">
                    <img
                      src="src/assets/login.jpg"
                      alt="Image"
                      style={{ maxWidth: "80%", height: "80%" }}
                    />
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
