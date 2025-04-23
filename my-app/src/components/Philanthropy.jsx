import React from 'react';
import '../styles/philanthropy.css';
import HuntsmanDonate from './Donate/HuntsmanDonate'; 
import '../styles/donate/huntsmanDonate.css';

import derby_days_recap_2025 from "../assets/images/philanthropy/Derby_Days_Recap_2025.png";

function Philanthropy() {
  return (
    <div className="philanthropy-page">
      <header className="hero-section">
        <div className="hero-overlay">
          <h1>The Huntsman Cancer Institute</h1>
          <p>
            We are proud to stand in partnership with the <b>Huntsman Cancer Institute</b>, alongside thousands 
            of college students, in supporting their lifesaving work. 
            Through collective action, compassion, and determination, we believe real change is possible.
            Together, we hope to become <b>The Generation to End Cancer™</b>.
          </p>
        </div>
      </header>

      <section className="content-section">
        <div className="content-container">
          <div className="left-image">
            <img
              src={derby_days_recap_2025}
              alt="Philanthropy event"
            />
          </div>
          
          <div className="right-text">
          <h1 className="section-title">Derby Days 2025</h1>
            <p>
              Derby Days is far more than an annual event—it is a heartfelt celebration of community, resilience, and collective impact.
              Organized by Huntsman Chairman Collin O' Neil, our efforts culminated in a record-breaking donation of $16,301 this year, 
              a milestone that speaks volumes about our unwavering commitment to advancing cancer research and treatment.
            </p>
          </div>
        </div>
      </section>

      <HuntsmanDonate />
    </div>
  );
}

export default Philanthropy;
