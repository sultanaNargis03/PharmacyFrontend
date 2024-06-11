import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setAuthHeader } from "../../helper/axios_helper";

import { ToastContainer, toast } from "react-toastify";
import { setCurrentUserRole } from "./Auth";
import { AuthContext } from "./AuthContext";

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
      // window.location.reload();
    } catch (error) {
      console.error("Failed to login:", error);
      toast.error("either username or password invalid!");
    }
  };

  const handleChange = (e) => {
    setLoginDto({ ...loginDto, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Login!!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>USER NAME:</label>
          <input
            type="text"
            name="username"
            value={loginDto.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>PASSWORD:</label>
          <input
            type="password"
            name="password"
            value={loginDto.password}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">Sign In</button>
        </div>
        <div>
          <span>Don't have an account yet?</span>
          <Link className="btn btn-link" to={"/register"}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
