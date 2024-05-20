import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Welcome to Pharmacy Management App!!</h1>
      <Link to="/register">Register</Link>
      <div>
        <Link to="/login">Already registered with us? login here</Link>
      </div>
    </div>
  );
};
export default Home;
