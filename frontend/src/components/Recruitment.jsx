import React from 'react';
import '../styles/recruitment.css';
import Footer from './Footer';
// Images
// import Header from '../assets/images/Rush_EXcellence.jpg';
import SigCylinder from '../assets/images/SigCylinder.jpg';
import Tabling from '../assets/images/Tabling.jpg';
import Kickball from '../assets/images/Kickball.jpg';
import Grilling from '../assets/images/Grilling.jpg';
import story from '../assets/images/Story.jpg';
import canes from '../assets/images/Canes.png';
import BG from '../assets/images/RecruitmentBG.png';
import Poolside from '../assets/images/Poolside.jpg';

function Recruitment() {
  return (
    <div className="recruitment-page" style={{ backgroundImage: `url(${BG})` }}>
      <header
        className="recruitment-hero"
        // style={{
        //   backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${Header})`,
        // }}
      >
        <h1 style={{ color: 'white', fontSize: '70px' }}>
          Sigma Chi – Lambda Delta Chapter
        </h1>
        <h2 style={{ color: 'white' }}>Spring 2026 Recruitment Week</h2>
      </header>

      <section className="schedule">
        <h2 style={{ fontSize: '55px', color: 'white' }}>
          Recruitment Schedule
        </h2>

        <div className="event">
          <div className="event-info">
            <h3>Tabling</h3>
            <p>
              <strong>Dates:</strong> September 8–12 and September 15–16
            </p>
            <p>
              <strong>Time:</strong> 11:00 AM – 2:00 PM
            </p>
            <p>
              <strong>Location:</strong> Pavilion Lawn
            </p>
            <p>
              Stop by to meet brothers, pick up a recruitment card, and learn
              more about our upcoming events.
            </p>
          </div>
          <img
            className="event-image"
            src={Tabling}
            alt="Recruitment tabling on campus"
            loading="lazy"
          />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Day 1: Monday, February 16th — Horses to Horsepower</h3>
            <p>
              <strong>Time:</strong> 7:30 – 9:00 PM
            </p>
            <p>
              <strong>Location:</strong> Bellevue Lot
            </p>
            <p>
              Our signature car meet event showcasing brother passions outside
              of the classroom.
            </p>
          </div>
          <img
            className="event-image"
            src={Poolside}
            alt="Poolside kickoff event"
            loading="lazy"
          />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Day 2: Tuesday, February 17th — Trial By Fire</h3>
            <p>
              <strong>Time:</strong> 7:30 – 9:30 PM
            </p>
            <p>
              <strong>Location:</strong> SSB 130
            </p>
            <p>
              Get to know the brothers under the heat of fiery hot and spicy
              wings.
            </p>
          </div>
          <img
            className="event-image"
            src={SigCylinder}
            alt="SigCylinder car meet"
            loading="lazy"
          />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Day 3: Wednesday, February 18th — The Grand Joust</h3>
            <p>
              <strong>Time:</strong> 7:20 – 9:30 PM
            </p>
            <p>
              <strong>Location:</strong> SSB 130
            </p>
            <p>
              A jousting competition between brothers and new members with
              inflatable Zorb Balls.
            </p>
          </div>
          <img
            className="event-image"
            src={Kickball}
            alt="Siglympics outdoor activities"
            loading="lazy"
          />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Day 4: Thursday, February 19th — Court of Knowledge</h3>
            <p>
              <strong>Time:</strong> 7:30 – 9:30 PM
            </p>
            <p>
              <strong>Location:</strong> SSB 130
            </p>
            <p>
              Dinner catered from Raising Cane’s with Sigma Chi themed trivia.
            </p>
          </div>
          <img
            className="event-image"
            src={canes}
            alt="Trivia night with dinner"
            loading="lazy"
          />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Day 5: Friday, February 20th — Tales from the Brotherhood</h3>
            <p>
              <strong>Time:</strong> 7:30 – 9:30 PM
            </p>
            <p>
              <strong>Location:</strong> SSB 130
            </p>
            <p>
              Brothers share personal Sigma Chi stories and values to potential
              new members.
            </p>
          </div>
          <img
            className="event-image"
            src={story}
            alt="Stories with Sigs evening"
            loading="lazy"
          />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>
              Day 6: Saturday, February 21st — Feast of Kings (Invite Only)
            </h3>
            <p>
              <strong>Time:</strong> 10:00 AM – 12:00 PM
            </p>
            <p>
              <strong>Location:</strong> Bellevue Lot
            </p>
            <p>
              Formal, invite-only recruitment wrap-up event with alumni
              speakers, steak lunch, and discourse.
            </p>
          </div>
          <img
            className="event-image"
            src={Grilling}
            alt="Steaks with Sigs invite-only event"
            loading="lazy"
          />
        </div>
      </section>

      <section className="questions">
        <h2>Questions?</h2>
        <p>
          For questions about recruitment or to express interest in joining:
        </p>
        <p>Contact: Israel Bracamonte, Recruitment Chairman</p>
        <p>
          Email:{' '}
          <a href="mailto:israelbracamonte@ucmerced.edu">
            israelbracamonte@ucmerced.edu
          </a>{' '}
          or phone: <a href="tel:8088241375">951-235-8940</a>
        </p>
        <p>
          Instagram:{' '}
          <a href="https://instagram.com/ucmsigmachi">@ucmsigmachi</a>
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default Recruitment;
