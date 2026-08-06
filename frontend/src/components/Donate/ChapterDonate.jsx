// ChapterDonate.jsx
import React from 'react';
import '../../styles/donate/chapterDonate.css';
import bidDayImage from '../../assets/images/bidDaySpring2024.jpg';
import DonationButton from '../DonationButton';

const ChapterDonate = () => {
  return (
    <section className="donation-section chapter-donation">
      <div className="donation-content">
        <h1>Support the Lambda Delta Chapter</h1>
        <p>
          This page documented the ways visitors could support the chapter when
          the site was active. Contributions helped create meaningful member
          experiences and invest in the chapter&apos;s future.
          <br />
          <br />
          The original donation and wishlist destinations are not active in this
          preserved copy.
        </p>
        <div className="button-group">
          <DonationButton
            disabled
            style={{ '--bg': '#007bff', '--hover-bg': '#0056b3' }}
          >
            Donation Page · Archived
          </DonationButton>

          <DonationButton
            disabled
            style={{ '--bg': '#ff9900', '--hover-bg': '#cc7a00' }}
          >
            Amazon Wishlist · Archived
          </DonationButton>
        </div>
      </div>
      <div className="donation-image">
        <img src={bidDayImage} alt="Donate - Lambda Delta Chapter" />
      </div>
    </section>
  );
};

export default ChapterDonate;
