import React from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <figure>
        <img
          className="img__navbar"
          src="https://favicontidyup.s3-sa-east-1.amazonaws.com/logodata.png"
          alt=""
        />
      </figure>

      <nav className="nav__container">
        <ul className="nav__container__lists__flex">
          <NavLink to="/">
            <Button
              exact
              className="nav__list__item"
              variant="text"
              color="default"
            >
              Home
            </Button>
          </NavLink>

          <NavLink to="/register">
            <Button className="nav__list__item" variant="text" color="default">
              Registro
            </Button>
          </NavLink>

          <NavLink to="/login">
            <Button className="nav__list__item" variant="text" color="default">
              Login
            </Button>
          </NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
