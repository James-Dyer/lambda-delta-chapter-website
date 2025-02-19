import React from "react";
import "../styles/awards.css"; // Ensure this CSS file is in place

const Awards = () => {
  return (
    <section className="awards-section">
      <div className="awards-content">
        <h1 className="awards-title">Achievements &amp; Recognition</h1>
        <p className="awards-blurb">
          We strive to better ourselves every day—and it shows in our dedication and accomplishments.
        </p>

        <div className="awards-items">

            {/* J. Dwight Peterson Significant Chapter Awards */}
            <div className="award-item">
                <h2 className="award-item-title">J. Dwight Peterson Significant Chapter Awards</h2>
                <p className="award-item-description">
                    Our chapter’s impressive track record speaks for itself—we have consistently been recognized for outstanding performance and impactful initiatives.
                </p>
            </div>
          
            {/* Balford Award Nominee */}
            <div className="award-item">
            <h2 className="award-item-title">Balford Award Nominee</h2>
            <div className="award-item-content">
                <img
                src="/images/balford-nominee-temp.jpg" 
                alt="Balford Award Nominee"
                className="award-image"
                />
                <div className="award-text">
                <p className="balfour-blurb">
                    We are excited to announce our Balfour Award chapter winner and international nominee: Name.
                    <br /><br />
                </p>
                
                <blockquote className="award-quote">
                    "Excellence is not an act, but a habit—one that inspires us every day."
                    <cite>– Brother</cite>
                </blockquote>
                </div>
            </div>
            </div>


            {/* Horizons Huntsman Leadership Summit */}
            <div className="award-item">
                <h2 className="award-item-title">Horizons Huntsman Leadership Summit</h2>
                <p className="award-item-description">
                Several of our brothers have been selected to attend the prestigious Horizons Huntsman Leadership Summit at Snowbird, Utah, reflecting our commitment to leadership and growth.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
