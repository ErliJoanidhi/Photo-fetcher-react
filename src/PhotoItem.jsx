import React from "react";
import "./App.css";

function PhotoItem({ imageUrl }) {
  return (
    <div className="photo-item">
      <img src={imageUrl} alt="random" />
      <div className="photo-overlay">
        <div>Lucas Budimaier</div>
        <div className="small-text">
          https://unsplash.com/photos/pwaaqfoMibl
        </div>
      </div>
    </div>
  );
}

export default PhotoItem;
