import React from 'react';
import '../styles/recruitment.css';
import Footer from './Footer';

function Recruitment() {
  return (
    <div className="recruitment-page">
      <header className="recruitment-hero">
        <h1>Sigma Chi – Lambda Delta Chapter</h1>
        <h2>Fall 2025 Recruitment Week</h2>
      </header>

      <section className="schedule">
        <h2>Recruitment Schedule</h2>

        <div className="event">
          <div className="event-info">
            <h3>Tabling</h3>
            <p>
              <strong>Dates:</strong> September 8–12 and September 15–19
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
          <div className="image-placeholder" />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Monday, September 15 — SigCylinder</h3>
            <p>
              <strong>Time:</strong> 7:00 – 9:00 PM
            </p>
            <p>
              <strong>Location:</strong> Bellevue Lot
            </p>
            <p>
              A casual kickoff event. Bring your car or just hang out and get to
              know us.
            </p>
          </div>
          <div className="image-placeholder" />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Tuesday, September 16 — Pool and BBQ</h3>
            <p>
              <strong>Time:</strong> 3:00 – 5:00 PM
            </p>
            <p>
              <strong>Location:</strong> UC Merced Recreation Pool
            </p>
            <p>A relaxed afternoon with food, conversation, and swimming.</p>
          </div>
          <div className="image-placeholder" />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Wednesday, September 17 — Siglympics</h3>
            <p>
              <strong>Time:</strong> 6:00 – 8:00 PM
            </p>
            <p>
              <strong>Location:</strong> Pavilion Lawn
            </p>
            <p>Friendly field-day activities.</p>
          </div>
          <div className="image-placeholder" />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Thursday, September 18 — Taco 'Bout It</h3>
            <p>
              <strong>Time:</strong> 7:30 – 9:30 PM
            </p>
            <p>
              <strong>Location:</strong> COB2 170
            </p>
            <p>
              An opportunity to engage in values based conversations over tacos.
            </p>
          </div>
          <div className="image-placeholder" />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Friday, September 19 — Driving Range</h3>
            <p>
              <strong>Time:</strong> 3:00 – 5:00 PM
            </p>
            <p>
              <strong>Location:</strong> Major Golf Sports Center (off-campus)
            </p>
            <p>
              Brothers will offer rides and will be insured by our insurance. DM
              us if you need a ride.
            </p>
            <p>
              A relaxed outing to the driving range. Rides will be offered to
              PNMs via social media.
            </p>
          </div>
          <div className="image-placeholder" />
        </div>

        <div className="event">
          <div className="event-info">
            <h3>Saturday, September 20 — Steaks with Sigs (Invite Only)</h3>
          </div>
          <div className="image-placeholder" />
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
