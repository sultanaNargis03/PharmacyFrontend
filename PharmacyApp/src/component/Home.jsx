import { getUsername } from "../helper/axios_helper";

const Home = () => {
  const username = getUsername();
  return (
    <div>
      <h3>Hello {username}! Welcome To PMA</h3>
    </div>
  );
};
export default Home;
