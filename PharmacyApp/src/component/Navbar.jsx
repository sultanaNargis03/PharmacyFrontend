import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getRole } from "../helper/axios_helper";

const Navbar = () => {
  const role = getRole();

  if (role == "user") {
    return (
      <div className="d-flex justify-content-between bg-secondary p-3 px-5 text-white">
        <Link to="/" className="navbar-brand fs-4 fw-bolder ">
          Home
        </Link>
        <Link to="/medicinelistuser" className="navbar-brand fs-4 fw-bolder">
          Pharma
        </Link>
        <Link to="/orderlist" className="navbar-brand fs-4 fw-bolder">
          Your orders
        </Link>
        <Link to="/cartlist" className="navbar-link fs-5 fw-bolder text-white">
          <BsCart />
        </Link>
      </div>
    );
  }
  if (role == "admin")
    return (
      <div className="d-flex justify-content-between bg-secondary p-3 px-5 text-white">
        <Link to="/" className="navbar-brand fs-4 fw-bolder ">
          Home
        </Link>
        <Link to="/medicinelistadmin" className="navbar-brand fs-4 fw-bolder">
          Pharma
        </Link>
      </div>
    );
};
export default Navbar;
