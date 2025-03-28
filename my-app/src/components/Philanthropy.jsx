import React from 'react';
import '../styles/philanthropy.css';

function Philanthropy() {
  return (
    <div className="philanthropy-page">
        <h1>Philanthropy</h1>
      <header className="hero-section">
        <div className="hero-overlay">
          
          <h2>Huntsman Cancer Foundation</h2>
          <p>
            At the heart of our mission, the Huntsman Cancer Foundation is a beacon of hope in the relentless battle against cancer.
            We are committed to accelerating the pace of cancer research and treatment, funding breakthrough studies, and pioneering life-saving therapies.
            By partnering with world-class research institutions and clinical experts, we fuel innovative approaches that transform experimental ideas into proven treatments.
            Every initiative we support not only advances our understanding of cancer but also brings us closer to a future where every patient benefits from cutting-edge, personalized care.
            Our dedication lies in turning challenges into opportunities for healing, ensuring that hope and progress go hand in hand in the fight against this formidable disease.
          </p>
        </div>
      </header>

      
      <section className="content-section">
    <h2 className="section-title">Derby Days 2025</h2>
    <div className="content-container">
        <div className="left-image">
        <img
            src="https://cdn.discordapp.com/attachments/723014403217162334/1354980544232034304/image.jpg?ex=67e74378&is=67e5f1f8&hm=9d439124e97697c6e25de3d64ae52539b8f79702defb22406deb53db4f2ccef4&"
            alt="Philanthropy event"
        />
        </div>
        <div className="right-text">
        <p>
        Derby Days is far more than an annual event—it is a heartfelt celebration of community, resilience, and collective impact.
        Organized by Huntsman Chairman Collin O' Neil, this week-long philanthropy initiative ignites passion and unity among our members and supporters.
        This year, our efforts culminated in a record-breaking donation of $16,301, a milestone that speaks volumes about our unwavering commitment to advancing cancer research and treatment.
        Every dollar raised fuels innovative projects, supports vital clinical trials, and helps pave the way for transformative care.
        Derby Days embodies the spirit of generosity and determination, reminding us that together, we can make a profound difference in the lives of those affected by cancer.
        </p>
        </div>
    </div>
    </section>


      <section className="donation-section">
        <button className="donation-button">Donate Now</button>
      </section>
    </div>
  );
}

export default Philanthropy;
