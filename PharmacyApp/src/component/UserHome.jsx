import { getUsername } from "../helper/axios_helper";
import Navbar from "./Navbar";

const UserHome = () => {
  const username = getUsername();
  console.log(username);
  return (
    <div>
      <Navbar />
      user dashboard
      <h3>Hello {username}! Welcome To PMA</h3>
    </div>
  );
};
export default UserHome;
