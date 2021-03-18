import React from "react";
import { NavLink } from "react-router-dom";
import { ThemeConsumer } from "../contexts/theme";
import { FaMoon, FaRegLightbulb } from "react-icons/fa";
import { rgbToHex } from "@material-ui/core";

const activeStyle = {
  color: "rgb(187, 46, 31)",
};

function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                to="/"
                exact
                activeStyle={activeStyle}
                className="nav-link"
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/battle"
                activeStyle={activeStyle}
                className="nav-link"
              >
                Battle
              </NavLink>
            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? <FaMoon /> : <FaRegLightbulb />}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}

export default Nav;
