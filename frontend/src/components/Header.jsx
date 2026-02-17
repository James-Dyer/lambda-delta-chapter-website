// Header.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/header.css';

// Image imports
import logo from '../assets/images/navbar/LambdaDeltaLogo.png';
import closeIcon from '../assets/images/navbar/closeIcon.png';
import hamburgerIcon from '../assets/images/navbar/hamburgerMenuIcon.png';
import useKnockDetector from './Secret/Knock';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // close mobile menu on navigation
  useEffect(() => setMenuOpen(false), [location]);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (shouldNavigate) {
      navigate('/challenge');
      setShouldNavigate(false);
    }
  }, [shouldNavigate, navigate]);

  const handleValidKnock = useCallback(() => {
    setShouldNavigate(true);
  }, []);

  const knockPattern = [250, 600];

  const handleClick = useKnockDetector(knockPattern, handleValidKnock);

  return (
    <header>
      <div className="header-content">
        <nav>
          <div id="navbar-logo" onClick={handleClick}>
            <NavLink to="/">
              <img src={logo} alt="Lambda Delta Logo" />
            </NavLink>
          </div>

          <div className="menu-container" ref={containerRef}>
            <div
              className={`menuBtn-wrapper ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <img
                className="menuBtn"
                src={menuOpen ? closeIcon : hamburgerIcon}
                alt="menu button"
              />
            </div>

            <ul className={`menuItems ${menuOpen ? 'open' : ''}`}>
              {[
                { to: '/', label: 'Home' },
                { to: '/donate', label: 'Donate' },
                { to: '/members', label: 'Members' },
                { to: '/philanthropy', label: 'Philanthropy' },
                { to: '/recruitment', label: 'Recruitment' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end
                    className={({ isActive }) => (isActive ? 'active' : '')}
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
