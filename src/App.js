import React, { useState, useEffect } from "react";
import "./App.css";
import PhotoItem from "./PhotoItem";

function App() {
  const [grayscale, setGrayscale] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchAndAppendImages(4);
  }, []); // Empty dependency array ensures that this effect runs only once, on initial mount

  const fetchAndAppendImages = (count) => {
    const baseURL = "https://picsum.photos/367/300";
    const newPhotos = [...photos];

    for (let i = 0; i < count; i++) {
      fetch(baseURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.url;
        })
        .then((imageUrl) => {
          newPhotos.push(imageUrl);
          if (newPhotos.length === photos.length + count) {
            setPhotos(newPhotos);
          }
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  };

  const handleFetchClick = () => {
    setPhotos([]);
    fetchAndAppendImages(4);
  };

  const handleAddMoreClick = () => {
    fetchAndAppendImages(4);
  };

  const handleGrayscaleChange = (e) => {
    setGrayscale(e.target.checked);
  };

  return (
    <div className="main-body">
      <div className="header">
        <p className="p">Photo Fetcher</p>
      </div>
      <div className="button-container">
        <div className="greyscale-container">
          <label className="switch">
            <input
              type="checkbox"
              id="grayscale"
              checked={grayscale}
              onChange={handleGrayscaleChange}
            />
            <span className="slider round"></span>
          </label>
          <span className="greyscale-text">Make photos grayscale</span>
        </div>
        <button id="fetch-button" onClick={handleFetchClick}>
          Fetch New Photos
        </button>
      </div>

      <div id="photoContainer" className={grayscale ? "greyscale" : ""}>
        {photos.map((photo, index) => (
          <PhotoItem key={index} imageUrl={photo} />
        ))}
      </div>
      <button id="add-more-button" onClick={handleAddMoreClick}>
        Add More Images
      </button>
    </div>
  );
}

export default App;
