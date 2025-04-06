import React from 'react';
import '../styles/philanthropy.css';
import HuntsmanDonate from './Donate/HuntsmanDonate'; 
import '../styles/donate/huntsmanDonate.css';

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
    <h1 className="section-title">Derby Days 2025</h1>
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


    <HuntsmanDonate />
    </div>
  );
}

export default Philanthropy;
