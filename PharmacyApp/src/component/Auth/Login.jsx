import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { doLogin } from "./Auth";
import { setAuthHeader } from "../../helper/axios_helper";

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
      const response = await axios.post(
        "http://localhost:8088/Pharmacy/api/auth/login",
        loginDto
      );
      setAuthHeader(response.data.accessToken);
      // navigate("/MedicineList");
      console.log(response.data);

      navigate("/CartList");
    } catch (error) {
      console.error("Failed to login:", error);
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
            type="text"
            name="password"
            value={loginDto.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        {/* <div>
          <button type="reset">Clear</button>
        </div> */}
      </form>
    </div>
  );
};
export default Login;
