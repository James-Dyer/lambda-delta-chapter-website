import React from "react";
import "../styles/footer.css"; // Import the footer styles

const Footer = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Lambda Delta Chapter. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
