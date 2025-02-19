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
            Sigma Chi was founded on June 28th, 1855 at Miami University in Oxford, Ohio.  
            The brotherhood has only grew, as Sigma Chi 
            recently initiated it's 350,000th member. At UC Merced, we strive to 
            uphold our fraternity's great legacy by  ___.
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
