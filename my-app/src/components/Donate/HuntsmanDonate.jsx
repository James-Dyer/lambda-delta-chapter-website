// HuntsmanDonate.jsx
import React from "react";
import "../../styles/donate/huntsmanDonate.css";

const HuntsmanDonate = () => {
  return (
    <section className="donation-section partner-donation">
      <div className="donation-content">
        <h1>Huntsman Cancer Institute</h1>
        <p>
          We are proud to partner with the Huntsman Cancer Institute in the fight
          against cancer. 100% of your donation through this link goes straight to
          the Huntsman Cancer Foundation. Please join us in supporting their work by
          donating today.
        </p>
        <a
          href="https://hope.huntsmancancer.org/gentoend/derby-days-2025"
          target="_blank"
          rel="noopener noreferrer"
          className="donate-button"
        >
          Donate Now
        </a>
      </div>
      <div className="donation-image neice-img">
        <img
          src="/images/nieceBidDaySpeechSpring2024.jpg"
          alt="Donate - Huntsman Cancer Institute"
        />
      </div>
    </section>
  );
};

export default HuntsmanDonate;
