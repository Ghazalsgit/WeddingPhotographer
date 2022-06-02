import React, { useRef, useEffect, useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import "../style.css";

function Camera() {
  let navigate = useNavigate();
  const { hasPhoto, setHasPhoto, setPhotoGallery, photoGallery } =
    useContext(AppContext);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  let notificationPermission = "";

  function requestNotificationsPermission() {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      notificationPermission = permission;
    });
  }

  const takePhoto = () => {
    if (hasPhoto == false) {
      const width = 550;
      const height = width / (16 / 9);

      let video = videoRef.current;
      let photo = photoRef.current;

      photo.width = width;
      photo.height = height;

      let context = photo.getContext("2d");
      context.drawImage(video, 0, 0, width, height);

      let data = photo.toDataURL("image/png", 7.0);
      if (notificationPermission === "granted") {
        createNotification();
      }

      const newData = [
        ...photoGallery,
        {
          original: data,
          id: photoGallery.length,
        },
      ];
      setPhotoGallery(newData);
      localStorage.setItem("cameraApp", JSON.stringify(newData));
      setHasPhoto(true);

      console.log(photoGallery);
    } else {
      getVideo();
      setHasPhoto(false);
    }
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1200, height: 2000 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  function goToGallery() {
    setHasPhoto(false);
    navigate("/");
  }

  function backToCamera() {
    setHasPhoto(false);
  }

  function createNotification() {
    const text = "Photo saved to gallery click here to see!";
    const notification = new Notification("PHOTO SAVED", { body: text });
    notification.addEventListener("click", () => {
      navigate("/");
    });
  }
  requestNotificationsPermission();

  return (
    <div className="allCamera">
      <div className="header-camera">
        <button className="gallery-button" onClick={() => goToGallery()}>
          Gallery
        </button>
        <h1>Camera</h1>
      </div>
      <div className="camera" style={{ display: hasPhoto ? "none" : "flex" }}>
        <video ref={videoRef}></video>
        <button className="take-photo-button" onClick={takePhoto}>
          Föreviga ett ögonblick
        </button>
      </div>
      <div className="hasPhoto" style={{ display: hasPhoto ? "flex" : "none" }}>
        <canvas ref={photoRef}></canvas>
        <button className="take-photo-button" onClick={() => backToCamera()}>
          Ta ett nytt
        </button>
      </div>
    </div>
  );
}

export default Camera;
