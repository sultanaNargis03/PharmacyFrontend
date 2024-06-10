import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div>
      <h1>Welcome to Pharmacy Management App!!</h1>
      <Link to="/register">Register</Link>
      <div>
        <span>Already registered with us? </span>
        <Link to="/login">login here</Link>
      </div>
    </div>
  );
};
export default Welcome;
