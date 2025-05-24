import React from "react";
import "../styles/philanthropy.css";
import "../styles/donate/huntsmanDonate.css";
import DonationButton from "./DonationButton";

import derby_days_recap_2025 from "../assets/images/philanthropy/Derby_Days_Recap_2025.png";

function Philanthropy() {
  return (
    <div className="philanthropy-page">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>The Huntsman Cancer Institute</h1>
          <p>
            We are proud to stand in partnership with the{" "}
            <b>Huntsman Cancer Institute</b>, alongside thousands of college
            students, in supporting their lifesaving work. Through collective
            action, compassion, and determination, we believe real change is
            possible. Together, we hope to become{" "}
            <b>The Generation to End Cancer™</b>.
          </p>
        </div>
      </header>

      <section className="content-section">
        <div className="content-container">
          <div className="left-image">
            <img src={derby_days_recap_2025} alt="Philanthropy event" />
          </div>

          <div className="right-text">
            <h1 className="section-title">Derby Days 2025</h1>
            <p>
              Derby Days is far more than an annual event—it is a heartfelt
              celebration of community, resilience, and collective impact.
              Organized by <b>Huntsman Chairman Collin O' Neil</b>, our efforts
              this year culminated in a record-breaking philanthropic fundraiser
              raising over <b>$16,000</b>, a milestone that will support
              invaluable cancer research and treatment for years to come.
              <br />
              <br />
              If you'd like, support our cause and take a moment to donate to
              the Huntsman Cancer Institute directly.
            </p>

            <DonationButton
              href="https://hope.huntsmancancer.org/gentoend/derby-days-2025"
              style={{ "--bg": "#007bff", "--hover-bg": "#0056b3" }}
            >
              Donate Now
            </DonationButton>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Philanthropy;
