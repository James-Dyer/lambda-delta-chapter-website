import React, { useState, useEffect } from "react";
import "../styles/archive.css";

const Archive = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageList = [
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975633352167607/E1C2A5E2-13DE-41BF-AF72-334C044B3E70_1_105_c.jpeg?ex=67e73ee5&is=67e5ed65&hm=6dae961932e0fc1270753f1dbff5a0dc9d06eeffdb2fc7bb57b008c71e01dd02&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975670241067008/IMG_0825.JPG?ex=67e73eee&is=67e5ed6e&hm=3e920ce88bcbd894cc9114c17823218dabf09ac7cdfed75d6ed9b660ca10e79f&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975670580809859/IMG_1015.JPG?ex=67e73eee&is=67e5ed6e&hm=1571359529fe720c4538523bd86d72f36149523b24f4d78e2baf00a9ecb8d79e&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975719918407840/IMG_1068.JPG?ex=67e73ef9&is=67e5ed79&hm=9daf7e6dd62871a42d0490de9bb302df8e96e32d92fc50d38c5dcef45000242b&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975720618594415/IMG_1016.JPG?ex=67e73efa&is=67e5ed7a&hm=f9388ef71a14ea3bdef167427abf5a18adb07dd61ecfb0086b94e53fe9cec882&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975720941818138/IMG_1130.JPG?ex=67e73efa&is=67e5ed7a&hm=1d4469ae4be49396f1f374266911b1fa2d635876e758a862ff4f6056ed390d8f&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975721231220867/IMG_1129.JPG?ex=67e73efa&is=67e5ed7a&hm=8c0f3a1efb7603db77df24e73de8a8bc49b3324a0bb78180983082dfa3dc1e8c&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975721981870180/IMG_2568.jpeg?ex=67e73efa&is=67e5ed7a&hm=8c644f89f6f0d1ca40ee14c86b8102f933ed1ac27553b7595f80f8dc8c67f19b&",
      "https://cdn.discordapp.com/attachments/723014403217162334/1354975670941388860/IMG_1074.JPG?ex=67e73eee&is=67e5ed6e&hm=152f671ecb0c134ee50f43a752ffb0724985f089c6cecc63e5dbcde8335c8649&",
    ]
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
