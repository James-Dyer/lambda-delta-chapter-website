import React, { useState, useEffect } from "react";
import "../styles/archive.css";

const Archive = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // For demonstration purposes, we use a static list of image URLs.
    // Replace these placeholder URLs with your actual Google Drive image URLs.
    // The URLs should be formatted as:
    // "https://drive.google.com/uc?export=view&id=YOUR_IMAGE_ID"
    const imageList = [
      "https://www.shutterstock.com/image-photo/madison-wisconsin-united-states-september-260nw-1714092871.jpg",
      "https://c8.alamy.com/comp/EK3NC7/ann-arbor-michigan-students-at-the-university-of-michigan-gather-at-EK3NC7.jpg",
      "https://c8.alamy.com/comp/K38EXT/old-school-front-row-from-left-to-right-jerod-mixon-as-weensie-vince-K38EXT.jpg",
      "https://c8.alamy.com/comp/2C3PJY8/miami-march-23-2019-young-men-from-the-omega-psi-phi-fraternity-pose-for-a-photograph-at-a-spring-break-party-on-south-beach-2C3PJY8.jpg",

      "https://drive.usercontent.google.com/download?id=1odqmgzrn-a4QGHoMCzzhqqiafkJqPc9M&authuser=0",
      
    ];
    setImages(imageList);
  }, []);

  return (
    <div className="archive-page">
      <h1>Chapter Archive</h1>
      <div className="masonry-grid">
        {images.map((url, index) => (
          <div key={index} className="masonry-item">
            <img src={url} alt={`Archive ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
