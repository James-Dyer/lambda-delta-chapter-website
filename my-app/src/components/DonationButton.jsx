// src/components/DonationButton.jsx
import React from "react";
import PropTypes from "prop-types";
import "../styles/donationButton.css";
import newTabIcon from "../assets/images/navbar/newTab.svg"; // Import the icon

const DonationButton = ({
  children,
  href,
  onClick,
  backgroundColor = "#007bff",
  hoverColor,
  ...rest
}) => {
  const style = {
    "--bg": backgroundColor,
    ...(hoverColor ? { "--hover-bg": hoverColor } : {}),
  };

  const content = (
    <>
      {children}
      {href && (
        <img
          src={newTabIcon}
          alt="Opens in new tab"
          style={{ marginLeft: "8px", height: "1em", verticalAlign: "middle" }}
        />
      )}
    </>
  );

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
        {content}
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
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
  hoverColor: PropTypes.string,
};

export default DonationButton;
