// Awards.jsx
import React, { useState } from 'react';
import '../../styles/home/awards.css';

// Image imports
import balfourImage from '../../assets/images/Raul_Balfour.png';

const Awards = () => {
  const [showAll, setShowAll] = useState(false);

  const awardsList = [
    { year: 2025, title: 'FSL Chapter of the Year' },
    { year: 2024, title: 'Peterson Significant Chapter Award' },
    { year: 2024, title: 'Legion of Honor Award' },
    { year: 2023, title: 'Peterson Significant Chapter Award' },
    { year: 2021, title: 'Peterson Significant Chapter Award' },
    { year: 2020, title: 'Peterson Significant Chapter Award' },
    { year: 2019, title: 'Peterson Significant Chapter Award' },
    { year: 2019, title: 'Daniel William Cooper Award' },
    { year: 2018, title: 'Peterson Significant Chapter Award' },
    { year: 2017, title: 'Peterson Significant Chapter Award' },
    { year: 2016, title: 'Peterson Significant Chapter Award' },
    { year: 2016, title: 'Legion of Honor Award' },
    { year: 2015, title: 'Peterson Significant Chapter Award' },
    { year: 2015, title: 'Legion of Honor Award' },
    { year: 2014, title: 'Peterson Significant Chapter Award' },
    { year: 2013, title: 'Peterson Significant Chapter Award' },
    { year: 2012, title: 'Peterson Significant Chapter Award' },
    { year: 2011, title: 'Peterson Significant Chapter Award' },
    { year: 2010, title: 'Peterson Significant Chapter Award' },
  ];

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <section className="awards-section">
      <div className="awards-content">
        <h1 className="awards-title">Achievements &amp; Recognition</h1>
        <p className="awards-intro">
          <i>
            Our chapter is dedicated to embodying the highest ideals, a
            commitment reflected in our international recognition. For more
            information about the International Fraternity's awards, see{' '}
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

            <div className="timeline-container">
              {(showAll ? awardsList : awardsList.slice(0, 5)).map(
                (award, index) => (
                  <div className="timeline-item" key={index}>
                    <span className="timeline-year">{award.year}</span>
                    <span className="timeline-title">{award.title}</span>
                  </div>
                )
              )}
              {awardsList.length > 5 && (
                <button className="timeline-toggle" onClick={toggleShowAll}>
                  {showAll ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </div>

          {/* Province Balfour Award Winner */}
          <div className="award-item">
            <h2 className="award-item-title">Province Balfour Award Winner</h2>
            <div className="award-item-content">
              <img
                src={balfourImage}
                alt="Collin O'Neil - Balfour Award Nominee"
                className="award-image"
              />
              <div className="award-text">
                <p className="balfour-blurb">
                  We are excited to announce our 2026 Balfour Province Award
                  winner and international nominee: Raul Nunes.
                  <br />
                  <br />
                </p>
                <blockquote className="award-quote">
                  "We are excited to announce our 2026 Balfour Chapter and
                  Province Award winner, and international nominee: Raul Nunes.
                  "I joined Sigma Chi when I was a freshman, and I could not
                  have imagined the role this fraternity would play in my life.
                  Sigma Chi developed me into the person I have become today,
                  and I will forever be in its debt. I am so glad I met this
                  group of guys, and am proud to say I have best friends for
                  life. As Isaac M Jordan said, 'Sigma Chi was my first love,
                  and it shall be my last'. IHSV"
                  <cite>– Brother Raul Nunes</cite>
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
              <br/>We are incredibly proud of our brothers, and we wish them luck on their journey.
            </p>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};

export default Awards;
