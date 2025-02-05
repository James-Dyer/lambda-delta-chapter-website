import React from "react";
import "../styles/header.css"; 

const Header = () => {
  return (
    <header>
      <div className="header-content">
        <nav>
          <div id="navbar-logo">
            <a href="index.html">
              <img src="images/LambdaDeltaLogo.png" alt="Lambda Delta Logo" />
            </a>
          </div>
          <ul>
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>
              <a href="#donate">Donate</a>
            </li>
            <li>
              <a href="#events">Events</a>
            </li>
            <li>
              <a href="https://sigmachi.org/" target="_blank" rel="noopener noreferrer">
                International Fraternity
              </a>
            </li>
          </ul>
        </nav>
        <div className="info">
          <a href="https://instagram.com/ucmsigmachi" target="_blank" rel="noopener noreferrer">
            @ucmsigmachi
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
