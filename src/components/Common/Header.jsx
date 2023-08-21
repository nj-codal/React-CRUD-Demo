import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import imgLogo from "@/assets/images/logo.svg";
import classNames from "classnames";
import LogoutButton from "@/components/Authentication/Logout/LogoutButton";
import { checkLogin } from "@/modules/authentication";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const { pathname: path } = useLocation();

  const isLoggedIn = checkLogin();

  return (
    <Navbar color="dark" dark expand="md" container="lg">
      <NavbarBrand tag="div">
        <Link to={isLoggedIn ? "/dashboard" : "/login"}>
          <img
            src={imgLogo}
            alt="Logo"
            style={{ height: 50, width: 50 }}
            className="slow-spin"
          />
        </Link>
      </NavbarBrand>
      <NavbarToggler onClick={toggleOpen} />
      {isLoggedIn && (
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <Link
                to="/dashboard"
                className={classNames("nav-link", {
                  active: path.includes("/dashboard"),
                })}
              >
                Dashboard
              </Link>
            </NavItem>
            <NavItem>
              <Link
                to="/users"
                className={classNames("nav-link", {
                  active: path.includes("/user"),
                })}
              >
                Users
              </Link>
            </NavItem>
          </Nav>
          <NavbarText>
            <LogoutButton />
          </NavbarText>
        </Collapse>
      )}
    </Navbar>
  );
};

export default React.memo(Header);
