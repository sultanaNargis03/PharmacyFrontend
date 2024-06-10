import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { doLogout, getCurrentUserRole, isLoggedIn } from "./Auth/Auth";
import { FaBars, FaSearch } from "react-icons/fa";
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

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [role, setRole] = useState(undefined);

  const username = getUsername();
  const navigate = useNavigate();

  const Logout = () => {
    doLogout(() => {
      setLogin(false);
      navigate("/");
    });
  };
  useEffect(() => {
    setLogin(isLoggedIn());
    setRole(getCurrentUserRole());
  }, [login]);

  return (
    <div>
      <Navbar className="my-2" color="dark" dark expand="md" fixed="">
        <NavbarBrand tag={ReactLink} to="/">
          Pharma
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)}></NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/home">
                    Home
                  </NavLink>
                </NavItem>
              </>
            )}
            {login && role.includes("ADMIN") && (
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
            {login && role.includes("USER") && (
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
                    Your order
                  </NavLink>
                </NavItem>
              </>
            )}
          </Nav>
          <Nav navbar>
            {login && (
              <>
                <NavItem>
                  <NavLink onClick={Logout}>Logout</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>{username}</NavLink>
                </NavItem>
              </>
            )}
            {!login && (
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
