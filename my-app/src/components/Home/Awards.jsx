import React, { useState } from "react";
import "../../styles/home/awards.css";

// Image imports
import balfordImage from "../../assets/images/balford-nominee-temp.jpg";


const Awards = () => {

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);

            const awardsList = [
              "Peterson Blue, 2025",
              "Peterson Blue, 2024",
              "Peterson Blue, 2023",
              "This list is a placeholder and is not accurate.",
              "Peterson Blue, 2021",
              "Peterson Blue, 2020",
              "Peterson Blue, 2019",
              "Peterson Blue, 2018",
              "Peterson Gold, 2017",
              "This list is a placeholder and is not accurate.",
            ];

            // Toggle visibility of the full list
            const toggleAccordion = () => {
              setIsAccordionOpen(!isAccordionOpen);
            };


  return (
    <section className="awards-section">
      <div className="awards-content">
        <h1 className="awards-title">Achievements &amp; Recognition</h1>
        <div className="awards-items">

          {/* J. Dwight Peterson Significant Chapter Awards */}
          <div className="award-item">
            <h2 className="award-item-title">J. Dwight Peterson Significant Chapter Awards</h2>
            <p className="award-item-description">
              <i>
                The J. Dwight Peterson Significant Chapter Award is given to Sigma Chi chapters that demonstrate
                excellence in leadership, operations, and community impact.
              </i>
            </p>
            
            {/* Accordion Menu */}
            <div className="accordion-header" onClick={toggleAccordion}>
              <p className="accordion-menu-title">
                View our award history
              </p>
              <span className={`accordion-icon ${isAccordionOpen ? "open" : ""}`}>
                {isAccordionOpen ? "-" : "+"}
              </span>
            </div>

            {/* Accordion Content */}
            {isAccordionOpen && (
              <div className="accordion-content">
                <ul className="award-list">
                  {awardsList.map((award, index) => (
                    <li key={index}>{award}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          
            {/* Balford Award Nominee */}
            <div className="award-item">
            <h2 className="award-item-title">Province Balfour Award Winner</h2>
            <div className="award-item-content">
            <img
              src={balfordImage}
              alt="Balford Award Nominees"
              className="award-image"
            />


                <div className="award-text">
                <p className="balfour-blurb">
                    We are excited to announce our 2025 Balfour Province Award winner and international nominee: Collin O' Neil.
                    <br /><br />
                </p>
                
                <blockquote className="award-quote">
                    "Quote from the Balfour Award Winner"
                    <cite>– Brother O'Neil</cite>
                </blockquote>
                </div>
            </div>
            </div>


            {/* Horizons Huntsman Leadership Summit */}
            <div className="award-item">
                <h2 className="award-item-title">Horizons Huntsman Leadership Summit</h2>
                <p className="award-item-description">
                Several of our brothers have been selected to attend the prestigious Horizons Huntsman Leadership Summit at Snowbird, Utah:
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;
