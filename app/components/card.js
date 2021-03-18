import React from "react";
import PropTypes from "prop-types";
import { ThemeConsumer } from "../contexts/theme";

function Card({ header, subheader, avatar, href, name, children }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        /* Card */
        <div className={`card bg-${theme}`}>
          {/* header */}
          <h4 className="header-lg center-text">{header}</h4>

          {/* avatar */}
          <img className="avatar" src={avatar} alt={`Avatar for ${name}`} />

          {/* show subheader if exist */}
          {subheader && <h4 className="center-text">{subheader}</h4>}

          {/* link */}
          <h2 className="center-text">
            <a className="link" href={href}>
              {name}
            </a>
          </h2>
          {children}
        </div>
      )}
    </ThemeConsumer>
  );
}

Card.propTypes = {
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Card;
