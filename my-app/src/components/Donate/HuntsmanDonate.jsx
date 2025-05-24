// HuntsmanDonate.jsx
import React from "react";
import "../../styles/donate/huntsmanDonate.css";
import nieceSpeechImage from "../../assets/images/nieceBidDaySpeechSpring2024.jpg";
import DonationButton from "../DonationButton";

const HuntsmanDonate = () => {
  return (
    <section className="donation-section partner-donation">
      <div className="donation-content">
        <h1>Huntsman Cancer Institute</h1>
        <p>
          We are proud to partner with the Huntsman Cancer Institute in the
          fight against cancer. 100% of your donation through this link goes
          directly to the Huntsman Cancer Foundation. Please join us in
          supporting their work by donating today.
        </p>
        <div className="button-group">
          <DonationButton
            href="https://hope.huntsmancancer.org/gentoend/derby-days-2025"
            style={{ "--bg": "#007bff", "--hover-bg": "#0056b3" }}
          >
            Donate Now
          </DonationButton>
        </div>
      </div>
      <div className="donation-image neice-img">
        <img src={nieceSpeechImage} alt="Donate - Huntsman Cancer Institute" />
      </div>
    </section>
  );
};

export default HuntsmanDonate;
