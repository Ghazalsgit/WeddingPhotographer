import React, { useState } from "react";
import { AppContext } from "./contexts/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import Camera from "./components/Camera";

function App() {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photoGallery, setPhotoGallery] = useState([]);

  return (
    <div className="App">
      <AppContext.Provider
        value={{ hasPhoto, setHasPhoto, photoGallery, setPhotoGallery }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Gallery />
                </>
              }
            />
            <Route
              path="/camera"
              element={
                <>
                  <Camera />
                </>
              }
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
