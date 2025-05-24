// Awards.jsx
import React, { useState } from "react";
import "../../styles/home/awards.css";

// Image imports
import balfordImage from "../../assets/images/collinoneil.jpg";

const Awards = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const awardsList = [
    "FSL Chapter of the Year, 2025",
    "Peterson Significant Chapter Award, 2024",
    "Legion of Honor Award, 2024",
    "Peterson Significant Chapter Award, 2023",
    "Peterson Significant Chapter Award, 2021",
    "Peterson Significant Chapter Award, 2020",
    "Peterson Significant Chapter Award, 2019",
    "Daniel William Cooper Award, 2019",
    "Peterson Significant Chapter Award, 2018",
    "Peterson Significant Chapter Award, 2017",
    "Peterson Significant Chapter Award, 2016",
    "Legion of Honor Award, 2016",
    "Peterson Significant Chapter Award, 2015",
    "Legion of Honor Award, 2015",
    "Peterson Significant Chapter Award, 2014",
    "Peterson Significant Chapter Award, 2013",
    "Peterson Significant Chapter Award, 2012",
    "Peterson Significant Chapter Award, 2011",
    "Peterson Significant Chapter Award, 2010",
  ];

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <section className="awards-section">
      <div className="awards-content">
        <h1 className="awards-title">Achievements &amp; Recognition</h1>
        <p className="awards-intro">
          <i>
            Our chapter is dedicated to embodying the highest ideals, a
            commitment reflected in our international recognition. For more
            information about the International Fraternity's awards, see{" "}
            <a
              href="https://sigmachi.org/home/resources-3/awards/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sigma Chi International Awards
            </a>
            .
          </i>
        </p>
        <div className="awards-items">
          {/* J. Dwight Peterson Significant Chapter Awards */}
          <div className="award-item">
            <h2 className="award-item-title">
              J. Dwight Peterson Significant Chapter Awards and More
            </h2>
            <p className="award-item-description">
              The highest honor an individual chapter may receive is the J.
              Dwight Peterson Significant Chapter Award, given to Sigma Chi
              chapters that demonstrate excellence in leadership, operations,
              and community impact.
            </p>

            {/* Accordion Menu */}
            <div className="accordion-header" onClick={toggleAccordion}>
              <p className="accordion-menu-title">View our award history</p>
              <span
                className={`accordion-icon ${isAccordionOpen ? "open" : ""}`}
              >
                {isAccordionOpen ? "-" : "+"}
              </span>
            </div>

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

          {/* Province Balfour Award Winner */}
          <div className="award-item">
            <h2 className="award-item-title">Province Balfour Award Winner</h2>
            <div className="award-item-content">
              <img
                src={balfordImage}
                alt="Balfour Award Nominee"
                className="award-image"
              />
              <div className="award-text">
                <p className="balfour-blurb">
                  We are excited to announce our 2025 Balfour Province Award
                  winner and international nominee: Collin O'Neil.
                  <br />
                  <br />
                </p>
                <blockquote className="award-quote">
                  "I joined Sigma Chi when I was a freshman, and I could not
                  have imagined the role this fraternity would play in my life.
                  Sigma Chi developed me into the person I have become today,
                  and I will forever be in its debt. I am so glad I met this
                  group of guys, and am proud to say I have brothers for life.
                  As Isaac M Jordan said, 'Sigma Chi was my first love, and it
                  shall be my last'. IHSV"
                  <cite>– Brother O'Neil</cite>
                </blockquote>
              </div>
            </div>
          </div>

          {/* Horizons Huntsman Leadership Summit 2025 */}
          {/*
          <div className="award-item">
            <h2 className="award-item-title">Horizons Huntsman Leadership Summit 2025</h2>
            <p className="award-item-description">
              Several of our brothers have been selected to attend the prestigious Horizons Huntsman Leadership Summit at Snowbird, Utah:
            </p>
            <ul className="summit-list">
              <li>Kshitij "KT" Tamang Chi</li>
              <li>Caleb Lee, Psi</li>
              <li>Joshua Jessen, Omega</li>
              <li>Dustin Chancey, Alpha Alpha</li>
            </ul>
            <p className="award-item-description">
              <br/>We are incredibly proud of our brothers, and we wish them luck on thier journey.
            </p>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Awards;
