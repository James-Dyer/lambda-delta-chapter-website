// Donation.jsx
import React from "react";
import "../styles/donate.css"; // Donation-specific styles
import Header from "../components/Header"; // Modular Header
import Footer from "../components/Footer"; // Modular Footer

const Donation = () => {
  return (
    <div className="donation-page">
      <Header />

      <main className="donation-main">
        {/* Donation to the Lambda Delta Chapter */}
        <section className="donation-section chapter-donation">
          <div className="donation-content">
            <h1>Donate to the Lambda Delta Chapter</h1>
            <p>
              Support our mission to foster leadership, friendship, and community.
              Your contribution helps us create meaningful experiences for our members and
              invest in the future of our chapter.
            </p>
            <button className="donate-button">Donate Now</button>
          </div>
          <div className="donation-image">
            <img src="/images/chapter-donation.jpg" alt="Lambda Delta Chapter" />
          </div>
        </section>

        {/* Donation to the Huntsman Cancer Institute */}
        <section className="donation-section partner-donation">
          <div className="donation-content">
            <h1>Donate to the Huntsman Cancer Institute</h1>
            <p>
              In partnership with the Huntsman Cancer Institute, we support groundbreaking research
              and exceptional patient care. Your donation directly contributes to cancer research,
              innovative treatments, and improved patient outcomes.
            </p>
            <button className="donate-button">Donate Now</button>
          </div>
          <div className="donation-image">
            <img src="/images/partner-donation.jpg" alt="Huntsman Cancer Institute" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donation;
