// HuntsmanDonate.jsx
import React from 'react';
import '../../styles/donate/huntsmanDonate.css';
import nieceSpeechImage from '../../assets/images/nieceBidDaySpeechSpring2024.jpg';
import DonationButton from '../DonationButton';

const HuntsmanDonate = () => {
  return (
    <section className="donation-section partner-donation">
      <div className="donation-content">
        <h1>Huntsman Cancer Institute</h1>
        <p>
          The chapter partnered with the Huntsman Cancer Institute in the fight
          against cancer. This section originally linked visitors to the
          Huntsman Cancer Foundation donation campaign.
        </p>
        <div className="button-group">
          <DonationButton
            disabled
            style={{ '--bg': '#007bff', '--hover-bg': '#0056b3' }}
          >
            Campaign · Archived
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
