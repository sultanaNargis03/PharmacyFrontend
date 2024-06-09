import { getUsername } from "../helper/axios_helper";
import CustomNavbar from "./CustomNavbar";

const UserHome = () => {
  const username = getUsername();
  console.log(username);
  return (
    <div>
      user dashboard
      <h3>Hello {username}! Welcome To PMA</h3>
    </div>
  );
};
export default UserHome;
