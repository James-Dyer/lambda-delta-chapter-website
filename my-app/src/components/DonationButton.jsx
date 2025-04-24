// src/components/DonationButton.jsx
import React from "react";
import PropTypes from "prop-types";
import "../styles/donationButton.css";

const DonationButton = ({
  children,
  href,
  onClick,
  backgroundColor = "#007bff",
  hoverColor,
  ...rest
}) => {
  // Use CSS custom properties so that our hover rule still works
  const style = {
    "--bg": backgroundColor,
    ...(hoverColor ? { "--hover-bg": hoverColor } : {}),
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={style}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="btn"
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
};

DonationButton.propTypes = {
  /** Button label or inner content */
  children: PropTypes.node.isRequired,
  /** If provided, renders as an <a> instead of <button> */
  href: PropTypes.string,
  /** Click handler for <button> version */
  onClick: PropTypes.func,
  /** Base background color (CSS var --bg) */
  backgroundColor: PropTypes.string,
  /** Hover background color (CSS var --hover-bg) */
  hoverColor: PropTypes.string,
};

export default DonationButton;
