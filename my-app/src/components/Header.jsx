// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"; 

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <nav>
          <div id="navbar-logo">
            <Link to="/">
              <img src="images/LambdaDeltaLogo.png" alt="Lambda Delta Logo" />
            </Link>
          </div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/donate">Donate</Link>
            </li>
            <li>
              <a href="/members">Members</a>
            </li>
            <li>
              <a
                href="https://sigmachi.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                International Fraternity
              </a>
            </li>
          </ul>
        </nav>
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
