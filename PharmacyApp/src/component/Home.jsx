import { Container } from "reactstrap";
import { getUsername } from "../helper/axios_helper";
import "./Welcome.css";

const Home = () => {
  const username = getUsername();

  return (
    <Container className="welcome-container" color="dark">
      <h3 className="welcome-heading">Hello {username}! Good to see you</h3>
    </Container>
  );
};
export default Home;
