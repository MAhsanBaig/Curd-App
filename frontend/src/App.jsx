import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    // Check if user is already signed up (you can also do this with an API call)
    const signedUp = localStorage.getItem("isSignedUp");
    if (signedUp) {
      setIsSignedUp(true);
    }

    // Check if user is already logged in (you can also do this with an API call)
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isSignedUp ? (isLoggedIn ? "/home" : "/login") : "/signup"} replace />}
        />
        <Route
          path="/signup"
          element={
            isSignedUp ? <Navigate to="/login" replace /> : <Signup setIsSignedUp={setIsSignedUp} />
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/home" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? <Home /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
