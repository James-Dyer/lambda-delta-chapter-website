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
        <h2 style={{ color: 'white' }}>Fall 2025 Recruitment Week</h2>
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
            <h3>Day 1: Monday, September 15 — Poolside with Sigma Chi</h3>
            <p>
              <strong>Time:</strong> 7:00 – 8:00 PM
            </p>
            <p>
              <strong>Location:</strong> Aquatics Center
            </p>
            <p>
              Social kickoff event to open recruitment in a casual, welcoming
              setting.
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
            <h3>Day 2: Tuesday, September 16 — SigCylinder</h3>
            <p>
              <strong>Time:</strong> 7:00 – 9:00 PM
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
            src={SigCylinder}
            alt="SigCylinder car meet"
            loading="lazy"
          />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Day 3: Wednesday, September 17 — Siglympics</h3>
            <p>
              <strong>Time:</strong> 6:00 – 8:00 PM
            </p>
            <p>
              <strong>Location:</strong> Pavilion Lawn
            </p>
            <p>Interactive outdoor games and team-building competitions.</p>
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
            <h3>Day 4: Thursday, September 18 — Canes & SigTrivia</h3>
            <p>
              <strong>Time:</strong> 7:30 – 10:00 PM
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
            <h3>Day 5: Friday, September 19 — Stories with Sigs</h3>
            <p>
              <strong>Time:</strong> 7:30 – 10:00 PM
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
              Day 6: Saturday, September 20 — Steaks with Sigs (Invite Only)
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
        <p>Contact: Raul Nunes, Recruitment Chairman</p>
        <p>
          Email: <a href="mailto:rnunes@ucmerced.edu">rnunes@ucmerced.edu</a> or
          phone: <a href="tel:8088241375">808-824-1375</a>
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
