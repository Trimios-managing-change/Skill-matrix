import React from "react";

import "../pagescss/landingpage.css"
import Landingpagenav from "../components/Landingpagenav";
import Landingpagebtns from "../components/Landingpagebtns";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Landingpagenav />
      
      <h1 id="1">Welcome to Your Success Story</h1>
      <h2 id="2">Skill Matrix — Validate. Grow. Excel.</h2>
      <h4 id="3">Skill Matrix empowers users with verified skill credentials, enhancing their market credibility. It helps organizations and managers analyze, track, and elevate employee skills — driving growth, bridging gaps, and shaping future-ready teams.</h4>
      
      <Landingpagebtns />
    </div>
  );
};

export default LandingPage;
