import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

// Image imports
import logo from "../assets/images/navbar/LambdaDeltaLogo.png";
import closeIcon from "../assets/images/navbar/closeIcon.png";
import hamburgerIcon from "../assets/images/navbar/hamburgerMenuIcon.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="header-content">
        <nav>
          <div id="navbar-logo">
            <Link to="/">
              <img src={logo} alt="Lambda Delta Logo" />
            </Link>
          </div>
          <ul className={`menuItems ${menuOpen ? "open" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/donate">Donate</Link>
            </li>
            <li>
              <Link to="/members">Members</Link>
            </li>
            <li>
              <Link to="philanthropy">Philanthropy</Link>
            </li>
            <li>
              <Link to="/Archive">Archive</Link>
            </li>
            <li>
              <Link to="/Alumni">Alumni</Link>
            </li>
          </ul>
        </nav>

        <div>
          <img
            className="menuBtn"
            src={menuOpen ? closeIcon : hamburgerIcon}
            alt="menu button"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

        <div className="info">
          <a
            href="https://instagram.com/ucmsigmachi"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ucmsigmachi
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
