import React from "react";
import "../styles/home.css";
import Header from "../components/Header"; // Import the Header component
import Footer from "../components/Footer"; // Import the Footer component

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
            <h1>Welcome to the Lambda Delta Chapter at UC Merced!</h1>
            <p>
            Our chapter champions academic excellence, 
            community service, and personal growth—values that not only build character, but also 
            create a positive impact on campus and beyond. We are proud to uphold chapter 
            traditions of giving back to the campus we call home, nurturing unity, leadership, 
            and lifelong brotherhood.
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

        {/* Featured News Section */}
        <section id="featured-news">
          <h2>FEATURED NEWS</h2>
          <div className="news-container">
            <div className="news-item">
              <img src="images/news1.jpg" alt="News 1 Image" />
              <h3>News Title 1</h3>
            </div>
            <div className="news-item">
              <img src="images/news2.jpg" alt="News 2 Image" />
              <h3>News Title 2</h3>
            </div>
            <div className="news-item">
              <img src="images/news3.jpg" alt="News 3 Image" />
              <h3>News Title 3</h3>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer /> {/* Modular Footer Component */}
    </div>
  );
};

export default Home;
