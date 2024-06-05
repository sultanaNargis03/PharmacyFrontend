import { jwtDecode } from "jwt-decode";
import { getAuthToken } from "../../helper/axios_helper";
import AdminHome from "../AdminHome";
import UserHome from "../UserHome";
const Decode = () => {
  const token = getAuthToken();
  const decoded = jwtDecode(token);
  console.log(decoded);
  const role = decoded.sub;
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
export default Decode;
