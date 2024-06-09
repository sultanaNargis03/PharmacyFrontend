import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { doLogout, isLoggedIn } from "./Auth/Auth";
import { FaBars, FaSearch } from "react-icons/fa";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { getUsername } from "../helper/axios_helper";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [login, setLogin] = useState(false);
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
  }, [login]);

  return (
    <div>
      <Navbar className="my-2" color="dark" dark expand="md" fixed="">
        <NavbarBrand tag={ReactLink} to="/">
          Pharma
        </NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)}></NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar></Nav>
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
