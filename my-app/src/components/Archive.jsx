import React, { useState, useEffect } from "react";
import "../styles/archive.css";

const Archive = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageList = [
      "https://plus.unsplash.com/premium_photo-1673967831980-1d377baaded2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D",
      "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YIGV8GTRHiW_KACLMhhi9fEq2T5BDQcEyA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlVTWL4dqk9ZokaiRQe0kdV3_dNvkB7A3xTw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSN5kyGXRsJTnCvfM371Ycg8u7k9viw1gW-g&s",
      "https://images.pexels.com/photos/57416/cat-sweet-kitty-animals-57416.jpeg?cs=srgb&dl=pexels-pixabay-57416.jpg&fm=jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDCsqRYLAFDdL4Ix_AHai7kNVyoPV9Ssv1xg&s",
      "https://www.aspca.org/sites/default/files/cat-care_general-cat-care_body1-left.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQEtrZpSL4T_53zcFsGnhjpbYrvdJLpXBADw&s",
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
