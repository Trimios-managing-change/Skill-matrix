import React from "react";

import "../pagescss/landingpage.css"
import Landingpagenav from "../components/Landingpagenav";
import Landingpagebtns from "../components/Landingpagebtns";



const LandingPage = () => {
  return (
    <div className="landing-page">
      <Landingpagenav />
      <div className="context">
      <h1 id="title">Welcome to <span className="highlight">Success Story</span></h1>

      <h2 id="2"><span className="highlight2">Skill Matrix</span> — Validate. Grow. Excel.</h2>
      <h4 id="3">Skill Matrix empowers users with verified skill credentials, enhancing their market credibility. It helps organizations and managers analyze, track, and elevate employee skills — driving growth, bridging gaps, and shaping future-ready teams.</h4>
      </div>
      <Landingpagebtns />
    </div>
  );
};

export default LandingPage;
