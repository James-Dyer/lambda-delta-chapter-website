// Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css"; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header>
      <div className="header-content">
        <nav>
          <div id="navbar-logo">
            <Link to="/">
              <img src="images/LambdaDeltaLogo.png" alt="Lambda Delta Logo" />
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
              <a href="/philanthropy">Philanthropy</a>
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
          <img className='menuBtn' src={menuOpen ?"/images/navbar/closeIcon.png" : "/images/navbar/hamburgerMenuIcon.png"} 
          alt="menu button" onClick={() => setMenuOpen(!menuOpen)} />
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
