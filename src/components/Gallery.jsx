import React, { useRef, useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function Gallery() {
  let navigate = useNavigate();
  const { hasPhoto, setHasPhoto, setPhotoGallery, photoGallery } =
    useContext(AppContext);
  const images = JSON.parse(localStorage.getItem("cameraApp"));

  function removeImage(imageId) {
    const removedImage = images.filter((data) => {
      return data.id !== imageId;
    });
    setPhotoGallery(removedImage);
    localStorage.setItem("cameraApp", JSON.stringify(removedImage));
  }
  return (
    <div>
      <div className="header-gallery">
        <button className="camera-button" onClick={() => navigate("/camera")}>
          Camera
        </button>
        <h1>Gallery</h1>
      </div>
      <div className="gallery">
        {images && images.map((image) => {
          return (
            <div className="image-div">
              <button onClick={() => removeImage(image.id)} className="close">
                X
              </button>
              <img
                className="gallery-img"
                key={image.id}
                src={image.original}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
