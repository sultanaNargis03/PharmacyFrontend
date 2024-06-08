import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerDto, setRegisterDto] = useState({
    username: "",
    password: "",
    email: "",
    phnNo: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(registerDto);
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8088/Pharmacy/api/auth/register",
        registerDto
      );
      navigate("/login");
    } catch (error) {
      console.error("Failed to register user:", error);
    }
  };
  const handleChange = (e) => {
    setRegisterDto({ ...registerDto, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2>Registration!!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>USER NAME:</label>
          <input
            type="text"
            name="username"
            value={registerDto.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>PASSWORD:</label>
          <input
            type="text"
            name="password"
            value={registerDto.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>EMAIL:</label>
          <input
            type="email"
            name="email"
            value={registerDto.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>PHONE NO:</label>
          <input
            type="text"
            name="phnNo"
            value={registerDto.phnNo}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
        {/* <div>
          <button type="reset">Clear</button>
        </div> */}
      </form>
    </div>
  );
};
export default Register;
