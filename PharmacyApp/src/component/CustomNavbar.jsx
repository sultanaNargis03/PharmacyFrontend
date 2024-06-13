// src/component/CustomNavbar.jsx
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
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
import { AuthContext } from "./Auth/AuthContext"; // Adjust the path if necessary
import { getCurrentUserRole } from "./Auth/Auth";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const role = getCurrentUserRole();
  const username = getUsername();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate("/"));
  };

  return (
    <div>
      <Navbar className="navbar-custom" color="dark" dark expand="md">
        <NavbarBrand tag={ReactLink} to="/">
          Pharma
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {isAuthenticated && (
              <NavItem>
                <NavLink tag={ReactLink} to="/home">
                  Home
                </NavLink>
              </NavItem>
            )}
            {isAuthenticated && role.includes("ADMIN") && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/medicinelistadmin">
                    Medicines
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/addmedicine">
                    Add Medicine
                  </NavLink>
                </NavItem>
              </>
            )}
            {isAuthenticated && role.includes("USER") && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/medicinelistuser">
                    Medicines
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/cartlist">
                    Your Cart
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/orderlist">
                    Your Orders
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {isAuthenticated ? (
              <>
                <NavItem>
                  <NavLink onClick={handleLogout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>{username}</NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Sign In
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/register">
                    Sign Up
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <NavbarText>Wishing you good health</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
