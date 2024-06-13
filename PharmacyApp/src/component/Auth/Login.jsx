import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuthHeader } from "../../helper/axios_helper";

import { ToastContainer, toast } from "react-toastify";
import { setCurrentUserRole } from "./Auth";
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
  Spinner,
} from "reactstrap";

const Login = () => {
  const [loginDto, setLoginDto] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(loginDto);
    e.preventDefault();
    window.localStorage.setItem("isLogedIn", true);

    try {
      if (loginDto.username.trim() == "" || loginDto.password.trim() == "") {
        toast.error("Username or password is required");
        return;
      }
      const response = await axios.post(
        "http://localhost:8088/Pharmacy/api/auth/login",
        loginDto
      );

      toast.success("login sucess");
      localStorage.setItem("data", JSON.stringify(response.data));
      setAuthHeader(response.data.accessToken);
      setCurrentUserRole(response.data.role);
      login();
      console.log("saved!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to login:", error);
      toast.error("either username or password invalid!");
    }
  };

  const handleChange = (e) => {
    setLoginDto({ ...loginDto, [e.target.name]: e.target.value });
  };
  return (
    <Container>
      <Row className="mt-4 mb-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader>
              <h3>Login!!</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="username">USER NAME</Label>

                  <Input
                    type="text"
                    name="username"
                    value={loginDto.username}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">PASSWORD</Label>

                  <Input
                    type="text"
                    name="password"
                    value={loginDto.password}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>

                <Container className="text-center">
                  <Button
                    color="light"
                    outline
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                  <Button
                    type="reset"
                    color="light"
                    //onClick={handleReset}
                    outline
                    className="ms-2"
                  >
                    Reset
                  </Button>
                </Container>
                <Container className="text-center ">
                  <span>Don't have an account yet?</span>
                  <Link className="btn btn-link" to={"/register"}>
                    Sign Up
                  </Link>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
