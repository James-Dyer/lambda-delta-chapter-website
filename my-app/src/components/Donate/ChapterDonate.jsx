// ChapterDonate.jsx
import React from "react";
import "../../styles/donate/chapterDonate.css";
import bidDayImage from "../../assets/images/bidDaySpring2024.jpg";
import DonationButton from "../DonationButton";

const ChapterDonate = () => {
  return (
    <section className="donation-section chapter-donation">
      <div className="donation-content">
        <h1>Support the Lambda Delta Chapter</h1>
        <p>
          Support our chapter today! Your contribution helps us create
          meaningful experiences for our members and invests in the future of
          our chapter.
          <br />
          <br />
          If you'd like, check out our Amazon Wishlist!
        </p>
        <div className="button-group">
          <DonationButton
            href="https://www.zeffy.com/donation-form/b0a9d5ff-e93c-47af-802b-9253c1dfc3b4"
            style={{ "--bg": "#007bff", "--hover-bg": "#0056b3" }}
          >
            Donate Now
          </DonationButton>

          <DonationButton
            href="https://www.amazon.com/hz/wishlist/ls/1Y4C3VN99C84U"
            style={{ "--bg": "#ff9900", "--hover-bg": "#cc7a00" }}
          >
            Amazon Wishlist
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
