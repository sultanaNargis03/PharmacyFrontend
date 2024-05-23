import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="d-flex justify-content-between bg-secondary p-3 px-5 text-white">
      <Link to="/medicinelist" className="navbar-brand fs-4 fw-bolder">
        Pharma
      </Link>
      <Link to="/cartlist" className="navbar-link fs-5 fw-bolder text-white">
        <BsCart />
      </Link>
    </div>
  );
};
export default Navbar;
