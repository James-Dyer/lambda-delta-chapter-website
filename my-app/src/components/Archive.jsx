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
      "https://drive.google.com/uc?export=view&id=IMAGE_ID_1",
      "https://drive.google.com/uc?export=view&id=IMAGE_ID_2",
      "https://drive.google.com/uc?export=view&id=IMAGE_ID_3",
      "https://drive.google.com/uc?export=view&id=IMAGE_ID_4",
      "https://drive.google.com/uc?export=view&id=IMAGE_ID_5",
      "https://drive.google.com/uc?export=view&id=IMAGE_ID_6"
      // add more image URLs as needed
    ];
    setImages(imageList);
  }, []);

  return (
    <div className="archive-page">
      <h1>Archive</h1>
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
