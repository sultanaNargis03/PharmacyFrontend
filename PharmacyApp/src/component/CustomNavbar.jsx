// src/component/CustomNavbar.jsx
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { getUsername } from "../helper/axios_helper";
import { AuthContext } from "./Auth/AuthContext";
import { getCurrentUserRole } from "./Auth/Auth";
import { CartContext } from "../component/Cart/CartContext";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const role = getCurrentUserRole();
  const username = getUsername();
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);

  useEffect(() => {
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  return (
    <div>
      <Navbar className="navbar-custom" color="dark" dark expand="md">
        <NavbarBrand tag={ReactLink} to="/">
          <i className="fas fa-prescription-bottle-alt"></i> Pharma
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {isAuthenticated && (
              <NavItem>
                <NavLink tag={ReactLink} to="/home">
                  <i className="fas fa-home"></i> Home
                </NavLink>
              </NavItem>
            )}
            {isAuthenticated && role.includes("ADMIN") && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/medicinelistadmin">
                    <i className="fas fa-pills"></i> Medicines
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/addmedicine">
                    <i className="fas fa-plus-circle"></i> Add Medicine
                  </NavLink>
                </NavItem>
              </>
            )}
            {isAuthenticated && role.includes("USER") && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/medicinelistuser">
                    <i className="fas fa-pills"></i> Medicines
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/cartlist">
                    <i className="fas fa-shopping-cart"></i>
                    Cart {cartCount}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/orderlist">
                    <i className="fas fa-box"></i> Your Orders
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {isAuthenticated ? (
              <>
                <NavItem>
                  <NavLink onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <i className="fas fa-user"></i> {username}
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    <i className="fas fa-sign-in-alt"></i> Sign In
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/register">
                    <i className="fas fa-user-plus"></i> Sign Up
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <NavbarText>
            <i className="fas fa-heartbeat"></i> Wishing you good health
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
