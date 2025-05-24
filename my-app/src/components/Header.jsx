// Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/header.css";

// Image imports
import logo from "../assets/images/navbar/LambdaDeltaLogo.png";
import closeIcon from "../assets/images/navbar/closeIcon.png";
import hamburgerIcon from "../assets/images/navbar/hamburgerMenuIcon.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation();

  // close mobile menu on navigation
  useEffect(() => setMenuOpen(false), [location]);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener(menuOpen ? "mousedown" : "click", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header>
      <div className="header-content">
        <nav>
          <div id="navbar-logo">
            <NavLink to="/">
              <img src={logo} alt="Lambda Delta Logo" />
            </NavLink>
          </div>

          <div className="menu-container" ref={containerRef}>
            <div
              className={`menuBtn-wrapper ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}
            >
              <img
                className="menuBtn"
                src={menuOpen ? closeIcon : hamburgerIcon}
                alt="menu button"
              />
            </div>

            <ul className={`menuItems ${menuOpen ? "open" : ""}`}>
              {[
                { to: "/",    label: "Home" },
                { to: "/donate",       label: "Donate" },
                { to: "/members",      label: "Members" },
                { to: "/philanthropy", label: "Philanthropy" },
              ].map(({to,label}) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end
                    className={({ isActive }) => isActive ? "active" : ""}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
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