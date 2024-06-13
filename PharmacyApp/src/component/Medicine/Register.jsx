import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
} from "reactstrap";

import { ToastContainer, toast } from "react-toastify";
import { getAuthToken } from "../../helper/axios_helper";

const Register = () => {
  const [registerDto, setRegisterDto] = useState({
    username: "",
    password: "",
    email: "",
    phnNo: "",
  });
  const [usernameTaken, setUsernameTaken] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (registerDto.username) {
      checkUsername(registerDto.username);
    }
  }, [registerDto.username]);
  const checkUsername = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8088/Pharmacy/api-user/presentbyusername/${username}`
      );
      console.log("check:" + response.data);
      if (response.data) {
        setUsernameTaken(true);
      } else {
        setUsernameTaken(false);
      }
    } catch (error) {
      console.error("Failed to check username:", error);
    }
  };

  const handleSubmit = async (e) => {
    console.log(registerDto);
    e.preventDefault();
    if (usernameTaken) {
      toast.error("Username is already taken");
      return;
      try {
        await axios.post(
          "http://localhost:8088/Pharmacy/api/auth/register",
          registerDto
        );
        toast.success("Registration Sucess");
        navigate("/login");
      } catch (error) {
        console.error("Failed to register user:", error);
        toast.error("something went wroong!");
      }
    }
  };
  const handleChange = (e) => {
    setRegisterDto({ ...registerDto, [e.target.name]: e.target.value });
  };
  // const handleReset = () => {
  //   setFormData({
  //     username: "",
  //     password: "",
  //     email: "",
  //     phnNo: "",
  //   });
  // };
  return (
    <Container>
      <Row className="mt-4 mb-4">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" inverse>
            <CardHeader>
              <h3>Fill Information to Register!!</h3>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="username">USER NAME</Label>

                  <Input
                    type="text"
                    name="username"
                    value={registerDto.username}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                  {usernameTaken && (
                    // <div>
                    //   <Input invalid />
                    //   <FormFeedback tooltip>
                    //     Oh noes! that name is already taken
                    //   </FormFeedback>
                    // </div>
                    <FormText color="danger">
                      Oh noes! that name is already taken
                    </FormText>
                  )}
                  {!usernameTaken && registerDto.username != "" && (
                    <FormText color="success">
                      Sweet! that name is availble
                    </FormText>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="password">PASSWORD</Label>

                  <Input
                    type="text"
                    name="password"
                    value={registerDto.password}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">EMAIL</Label>

                  <Input
                    type="email"
                    name="email"
                    value={registerDto.email}
                    placeholder="Enter Here..."
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="phnNo">PHONE NO</Label>

                  <Input
                    type="text"
                    name="phnNo"
                    value={registerDto.phnNo}
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
                    Sign Up
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
                  <span>Already have an account?</span>
                  <Link className="btn btn-link" to={"/login"}>
                    Sign In
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
export default Register;
