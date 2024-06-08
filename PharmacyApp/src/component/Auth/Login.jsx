import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthHeader } from "../../helper/axios_helper";
import { doLogin, isLoggedIn } from "./Auth";

const Login = () => {
  const [loginDto, setLoginDto] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    console.log(loginDto);
    e.preventDefault();
    try {
      if (loginDto.username.trim() == "" || loginDto.password.trim() == "") {
        //toast.error("Username or password is required")
        return;
      }
      const response = await axios.post(
        "http://localhost:8088/Pharmacy/api/auth/login",
        loginDto
      );
      //toast.success("login sucess");
      console.log(response);
      doLogin(response);
      isLoggedIn();
      setAuthHeader(response.data.accessToken);
      navigate("/Dashboard");
      //navigate("/MedicineList");
    } catch (error) {
      console.error("Failed to login:", error);
      //toast.error("username or password not correct")
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
