import React from 'react';
import '../styles/philanthropy.css';

function Philanthropy() {
  return (
    <div className="philanthropy-page">
      <header className="hero-section">
        <div className="hero-overlay">
          
          <h2>Huntsman Cancer Foundation</h2>
          <p>
            At the heart of our mission, the Huntsman Cancer Foundation is a beacon of hope in the relentless battle against cancer.
            We are committed to accelerating the pace of cancer research and treatment, funding breakthrough studies, and pioneering life-saving therapies.
            By partnering with world-class research institutions and clinical experts, we fuel innovative approaches that transform experimental ideas into proven treatments.
          </p>
        </div>
      </header>

      
      <section className="content-section">
    <h2 className="section-title">Derby Days 2025</h2>
    <div className="content-container">
        <div className="left-image">
        <img
            src="https://cdn.discordapp.com/attachments/723014403217162334/1354980005440000070/image.jpg?ex=67e742f7&is=67e5f177&hm=5a13256130025b508885ae35698cf373523cafeaa3cba30feed7273ec0d54a61&"
            alt="Philanthropy event"
        />
        </div>
        <div className="right-text">
        <p>
        Derby Days is far more than an annual event—it is a heartfelt celebration of community, resilience, and collective impact.
        Organized by Huntsman Chairman Collin O' Neil, our efforts culminated in a record-breaking donation of $16,301 this year, 
        a milestone that speaks volumes about our unwavering commitment to advancing cancer research and treatment.
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
