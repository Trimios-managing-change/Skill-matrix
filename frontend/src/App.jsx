import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  // Get the logged-in status and parse it as a boolean
  //const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <Routes>
      <Route path="/" element={ <LandingPage /> } />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
};

export default App;
