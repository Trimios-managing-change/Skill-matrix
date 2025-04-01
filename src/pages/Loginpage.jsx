import React, { useState } from 'react';
import logoheader from '../assets/logo-header.svg';
import AboutContext from '../components/AboutContext';
import LoginForm from '../components/Loginform';
import RegisterForm from '../components/Registerform';
import Footer from '../components/Footer';
import '../pagescss/loginpage.css'

function Loginpage() {
  const [formType, setFormType] = useState('login'); // State to toggle between forms

  return (
    <>
      <div className="viewscreen">
        <div className="header">
          <div className="logo">
          <img src={logoheader} alt="Logo" />
           </div>
          <div className="header_contents">
            <ul>
              <li id="home">Home</li>
              <li id="aboutus">About Us</li>
              <li id="contactus">Contact Us</li>
              <li id="privacy">Privacy Policy</li>
              <li id="login" onClick={() => setFormType('login')}>Login /</li>
              <li id="signup" onClick={() => setFormType('signup')}>Sign Up</li>
            </ul>
          </div>
        </div>

        <div className='content'>
          <div className="textcontent">
            <div className="text">
              <h1 id='welcome'>Welcome to Your <span id="colorgrade1"> Success Story</span></h1>
              <h1 id="introhead"><span id="colorgrade2">Skill Matrix</span> — Validate. Grow. Excel.</h1>
              <p id="intro">
                Skill Matrix empowers users with verified skill credentials, enhancing their market credibility. 
                It helps organizations and managers analyze, track, and elevate employee skills — 
                driving growth, bridging gaps, and shaping future-ready teams.
              </p>
            </div>
            <div className="contextbuttons">
              <AboutContext />
            </div>
          </div>

          <div className="loginregisterspace">
            {/* Conditional Rendering */}
            {formType === 'login' ? (
              <LoginForm formType={formType} setFormType={setFormType} />
            ) : (
              <RegisterForm formType={formType} setFormType={setFormType} />
            )}
          </div>
        </div>
      </div>

      <div className="footer">  
        <Footer/>
      </div>
    </>
  );
}

export default Loginpage;
