import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  const { clearToken } = useAuth();
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    clearToken(); // Clear the authentication token
    navigate("/", { replace: true }); // Navigate to the home page ("/") with replace option set to true
  };

  // Automatically logout after 3 seconds
  setTimeout(() => {
    handleLogout(); // Invoke the logout action
  }, 3 * 1000);

  return <>Logout Page</>;
};

export default Logout;
