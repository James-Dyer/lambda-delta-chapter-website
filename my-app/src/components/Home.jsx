import React from "react";
import "../styles/home.css";
import Footer from "../components/Footer"; // Import the Footer component
import Awards from "../components/Awards";

const Home = () => {
  return (
    <div>

      {/* Main Content */}
      <main>
        <section id="about-us">
          <div id="expect-more-logo">
            <img
              src="images/UC-Merced-SigmaChi-ExpectMore.svg"
              alt="Sigma Chi Expect More Logo"
            />
          </div>
          <div>
            <h1>A Lasting Legacy</h1>
            <p>
            Founded on June 28, 1855, at Miami University in Oxford, Ohio, Sigma Chi has grown into one of 
            the largest and most respected fraternities in the world, recently initiating its 350,000th member.
            At UC Merced, strive to uphold that great legacy by excelling in a broad range of endeavors — from 
            philanthropy to academic achievement, leadership, and campus involvement. 
            More than just a fraternity, Sigma Chi is a lifelong brotherhood built on shared values, lasting friendships, and 
            unforgettable experiences that extend well beyond college.
            </p>
            <p className="important-quote">
            Men join fraternities. Leaders of men join Sigma Chi.
            </p>
          </div>
        </section>

        <section id="recruitment-video">
          <video controls autoPlay muted loop>
            <source src="videos/sample-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
