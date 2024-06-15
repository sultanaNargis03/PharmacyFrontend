import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./Welcome.css";
const Welcome = () => {
  return (
    <Container className="welcome-container" color="dark">
      <h1 className="welcome-heading">Welcome to Pharma Healthcare</h1>
    </Container>
  );
};
export default Welcome;
