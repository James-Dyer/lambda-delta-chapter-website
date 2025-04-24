// src/components/RecruitmentExclusive.jsx
import React from "react";
import "../styles/recruitment.css";

const Recruitment = () => (
  <div className="recruitment-exclusive-page">
    <h1 className="fade-in" style={{ animationDelay: "0.5s" }}>Recruitment 2025</h1>

    <section className="schedule-section fade-in" style={{ animationDelay: "0.8s" }}>
      <h2>Recruitment Schedule</h2>

      <div className="table-block">
        <h3>Tabling</h3>
        <p><strong>Dates:</strong> September 8–12 & September 15–19</p>
        <p><strong>Time:</strong> 11:00 AM – 2:00 PM</p>
        <p><strong>Location:</strong> Pavilion Lawn</p>
        <p>Stop by to meet brothers, pick up a card, and learn more.</p>
        <div className="image-placeholder"></div>
      </div>

      {/** Monday 15th **/}
      <div className="event-card fade-in" style={{ animationDelay: "1.1s" }}>
        <h3>Monday, September 15 – SigCylinder</h3>
        <p><strong>Time:</strong> 7:00 – 9:00 PM</p>
        <p><strong>Location:</strong> Bellevue Lot</p>
        <p>A casual kickoff. Bring your car or just hang out.</p>
        <div className="image-placeholder small"></div>
      </div>

      {/** Tuesday 16th **/}
      <div className="event-card fade-in" style={{ animationDelay: "1.4s" }}>
        <h3>Tuesday, September 16 – Pool & BBQ</h3>
        <p><strong>Time:</strong> 3:00 – 5:00 PM</p>
        <p><strong>Location:</strong> UC Merced Recreation Pool</p>
        <p>Relaxed afternoon with food and swimming.</p>
        <div className="image-placeholder small"></div>
      </div>

      <div className="event-card backup-event fade-in" style={{ animationDelay: "1.7s" }}>
        <h3>Back-Up: Zeus’ Gambit – Poker Night</h3>
        <p><strong>Time:</strong> 7:30 – 9:30 PM</p>
        <p><strong>Location:</strong> Granite 135</p>
        <p>No-gambling poker night for good conversation.</p>
        <div className="image-placeholder small"></div>
      </div>

      {/** Wednesday 17th **/}
      <div className="event-card fade-in" style={{ animationDelay: "2.0s" }}>
        <h3>Wednesday, September 17 – Siglympics</h3>
        <p><strong>Time:</strong> 6:00 – 8:00 PM</p>
        <p><strong>Location:</strong> Pavilion Lawn</p>
        <p>Friendly field-day activities.</p>
        <div className="image-placeholder small"></div>
      </div>

      {/** Thursday 18th **/}
      <div className="event-card fade-in" style={{ animationDelay: "2.3s" }}>
        <h3>Thursday, September 18 – Taco ’Bout It</h3>
        <p><strong>Time:</strong> 7:30 – 9:30 PM</p>
        <p><strong>Location:</strong> COB2 170</p>
        <p>Values-based conversation over tacos.</p>
        <div className="image-placeholder small"></div>
      </div>

      {/** Friday 19th **/}
      <div className="event-card fade-in" style={{ animationDelay: "2.6s" }}>
        <h3>Friday, September 19 – Apollo’s Open</h3>
        <p><strong>Time:</strong> 3:00 – 5:00 PM</p>
        <p><strong>Location:</strong> Major Golf Sports Center</p>
        <p>Driving range outing. DM for insured rides.</p>
        <div className="image-placeholder small"></div>
      </div>

      {/** Saturday 20th **/}
      <div className="event-card fade-in" style={{ animationDelay: "2.9s" }}>
        <h3>Saturday, September 20 – Steaks with Sigs</h3>
        <p><em>Feast of the Gods (Invite Only)</em></p>
        <div className="image-placeholder small"></div>
      </div>
    </section>

    <section className="requirements-section fade-in" style={{ animationDelay: "3.2s" }}>
      <h2>Requirements</h2>
      <ul>
        <li>2.75 Cumulative GPA</li>
        <li>Good standing with the university</li>
        <li>At least 12 credits full-time</li>
      </ul>
      <p>
        Based on&nbsp;
        <a
          href="https://fraternitysorority.ucmerced.edu/how-join/requirements-participate"
          target="_blank"
          rel="noopener noreferrer"
        >
          FSL & Sigma Chi Requirements
        </a>.
      </p>
    </section>

    <section className="contact-section fade-in" style={{ animationDelay: "3.5s" }}>
      <h2>Questions?</h2>
      <p>
        <strong>Contact:</strong> Raul Nunes, Recruitment Chairman
      </p>
      <p>
        <strong>Email:</strong>{" "}
        <a href="mailto:rnunes@ucmerced.edu">rnunes@ucmerced.edu</a>{" "}
        | <strong>Phone:</strong>{" "}
        <a href="tel:8088241375">808-824-1375</a>
      </p>
      <p>
        <strong>Instagram:</strong>{" "}
        <a
          href="https://instagram.com/ucmsigmachi"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ucmsigmachi
        </a>
      </p>
    </section>
  </div>
);

export default Recruitment;
