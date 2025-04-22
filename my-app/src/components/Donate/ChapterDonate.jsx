// ChapterDonate.jsx
import React from "react";
import "../../styles/donate/chapterDonate.css";
import bidDayImage from "../../assets/images/bidDaySpring2024.jpg";


const ChapterDonate = () => {
  return (
    <section className="donation-section chapter-donation">
      <div className="donation-content">
        <h1>Support the Lambda Delta Chapter</h1>
        <p>
          Support our chapter today! Your contribution helps us create meaningful
          experiences for our members and invests in the future of our chapter.
          <br /><br />
          If you'd like, check out our Amazon Wishlist!
        </p>
        <div className="button-group">
          <button className="donate-button">Donate Now</button>
          <a
            href="https://www.amazon.com/hz/wishlist/ls/1Y4C3VN99C84U"
            target="_blank"
            rel="noopener noreferrer"
            className="wishlist-button"
          >
            Amazon Wishlist
          </a>
        </div>
      </div>
      <div className="donation-image">
      <img
        src={bidDayImage}
        alt="Donate - Lambda Delta Chapter"
      />

      </div>
    </section>
  );
};

export default ChapterDonate;
