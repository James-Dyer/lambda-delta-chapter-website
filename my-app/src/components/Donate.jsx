// Donation.jsx
import React from "react";
import "../styles/donate.css"; // Donation-specific styles
import Footer from "../components/Footer"; // Modular Footer

const Donate = () => {
  return (
    <div className="donation-page">
      <main className="donation-main">
        {/* Donation to the Lambda Delta Chapter */}
        <section className="donation-section chapter-donation">
          <div className="donation-content">
            <h1>Lambda Delta Chapter</h1>
            <p>
              Support our chapter today!
              Your contribution helps us create meaningful experiences for our members and
              invests in the future of our chapter.

              <br /><br />If you'd like, check out our Amazon Wishlist!
            </p>
            <div className="button-group">
              <button className="donate-button">Donate Now</button>
              <a href="https://www.amazon.com/hz/wishlist/your-wishlist-link" target="_blank" rel="noopener noreferrer" className="wishlist-button">
                Amazon Wishlist
              </a>
            </div>
          </div>
          <div className="donation-image">
            <img src="/images/bidDaySpring2024.jpg" alt="Donate - Lambda Delta Chapter" />
          </div>
        </section>


        {/* Donation to the Huntsman Cancer Institute */}
        <section className="donation-section partner-donation">
          <div className="donation-content">
            <h1>Huntsman Cancer Institute</h1>
            <p>
            We are proud to partner with the Huntsman Cancer Institute in the fight against cancer. 
            Please join us in supporting their work by donating today. 
            </p>
            <button className="donate-button">Donate Now</button>
          </div>
          <div className="donation-image">
            <img src="/images/nieceBidDaySpeechSpring2024.jpg" alt="Donate - Huntsman Cancer Institute" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Donate;
