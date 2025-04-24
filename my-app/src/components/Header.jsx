// Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/header.css";

// Image imports
import logo from "../assets/images/navbar/LambdaDeltaLogo.png";
import closeIcon from "../assets/images/navbar/closeIcon.png";
import hamburgerIcon from "../assets/images/navbar/hamburgerMenuIcon.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation();

  // Close menu when navigating (link click)
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header>
      <div className="header-content">
        <nav>
          <div id="navbar-logo">
            <Link to="/">
              <img src={logo} alt="Lambda Delta Logo" />
            </Link>
          </div>

          {/* Container to position menu button and dropdown relative to each other */}
          <div className="menu-container" ref={containerRef}>
          <div className={`menuBtn-wrapper ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(prev => !prev)}>
          <img
            className="menuBtn"
            src={menuOpen ? closeIcon : hamburgerIcon}
            alt="menu button"
          />
        </div>




            <ul className={`menuItems ${menuOpen ? "open" : ""}`}>
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              </li>
              <li>
                <Link to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link>
              </li>
              <li>
                <Link to="/members" onClick={() => setMenuOpen(false)}>Members</Link>
              </li>
              <li>
                <Link to="/philanthropy" onClick={() => setMenuOpen(false)}>Philanthropy</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="instagram">
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