import { getRole } from "../helper/axios_helper";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

const Dashboard = () => {
  const role = getRole();
  if (role == "admin")
    return (
      <div>
        <AdminHome />
      </div>
    );
  if (role == "user")
    return (
      <div>
        <UserHome />
      </div>
    );
};
export default Dashboard;
