import React from "react";
import "../styles/home.css";
import Header from "../components/Header"; // Import the Header component
import Footer from "../components/Footer"; // Import the Footer component

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <Header />

      {/* Main Content */}
      <main>
        <section id="about-us">
          <div id="expect-more-logo">
            <img src="images/UC-Merced-SigmaChi-ExpectMore.svg" alt="Sigma Chi Expect More Logo" />
          </div>
          <div>
            <h1>The Lambda Delta Chapter</h1>
            <p>
              Welcome to the UC Merced Sigma Chi chapter. We focus on leadership, friendship, and more.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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

      {/* Footer */}
      <Footer />  {/* Modular Footer Component */}
    </div>
  );
};

export default Home;
