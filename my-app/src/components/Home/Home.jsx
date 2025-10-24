import React from 'react';
import '../../styles/home/home.css';

import Footer from '../Footer';
import Awards from '../Home/Awards';

// Media
import expect_more_logo from '../../assets/images/UC-Merced-SigmaChi-ExpectMore.svg';
import recruitment_video from '../../assets/videos/recruitmentVid.MOV';

const Home = () => {
  return (
    <div>
      {/* Main Content */}
      <main>
        <section id="about-us">
          <div id="expect-more-logo">
            <img src={expect_more_logo} alt="Sigma Chi Expect More Logo" />
          </div>
          <div>
            <h2>A Legacy of Excellence</h2>
            <p>
              Founded on June 28, 1855, at Miami University in Oxford, Ohio,
              Sigma Chi has grown into one of the largest and most respected
              fraternities in the world, recently initiating its 350,000th
              member. At UC Merced, we strive to uphold that great legacy by
              excelling in a broad range of endeavors — from philanthropy to
              academic achievement, leadership, and campus involvement. More
              than just a fraternity, Sigma Chi is a lifelong brotherhood built
              on shared values, lasting friendships, and unforgettable
              experiences that extend well beyond college.
            </p>
            <p className="important-quote">
              Men join fraternities. Leaders of men join Sigma Chi.
            </p>
          </div>
        </section>

        <section id="recruitment-video">
          <div className="videoWrapper">
            <video controls autoPlay muted loop>
              <source src={recruitment_video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        <section id="schedule">
          <h2>Schedule</h2>
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLos_Angeles&showPrint=0&title=Sigma%20Chi%20Public%20Calendar&src=MjI4NzU3MDRmMjZjY2M2MjhmYTJjYmRhNGMzMDcxODIyYjM3YWY3Nzg0OTc0NDU0MGRlM2Q3ZTgxYTgwZTVkYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23795548"
            style={{ border: 'solid 1px #777' }}
            width="800"
            height="600"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </section>
      </main>
      {/* Awards & Recognition*/}
      <Awards />
      {/* Footer */}
      <Footer /> {}
    </div>
  );
};

export default Home;
