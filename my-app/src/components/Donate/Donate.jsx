// Donate.jsx
import React from "react";
import "../../styles/donate/donate.css"; // Page-level styling
import ChapterDonate from "./ChapterDonate";
import HuntsmanDonate from "./HuntsmanDonate";
import Footer from "../Footer";

const Donate = () => {
  return (
    <div className="donation-page">
      <main className="donation-main">
        <ChapterDonate />
        <HuntsmanDonate />
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
