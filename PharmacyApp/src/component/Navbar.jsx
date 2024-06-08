import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { isLoggedIn } from "./Auth/Auth";

const Navbar = () => {
  // const [login, setLogin] = useState(false);
  // useEffect(() => {
  //   setLogin(isLoggedIn());
  // }, [login]);
  return (
    <div className="d-flex justify-content-between bg-secondary p-3 px-5 text-white">
      <Link to="/userhome" className="navbar-brand fs-4 fw-bolder ">
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

      <Link to="/login" className="navbar-brand fs-4 fw-bolder ">
        Login
      </Link>

      <Link to="/logout" className="navbar-brand fs-4 fw-bolder ">
        Logout
      </Link>
    </div>
  );
};
export default Navbar;
