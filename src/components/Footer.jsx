import React from 'react';
import logo from '../assets/logo.svg';

function Footer() {
    return (
        <div className="footer">
            {/* Left side: Logo */}
            <div className="footer-logo">
                <img src={logo} alt="Logo" />
            </div>

            {/* Right side: Footer content */}
            <div className="footer-content">
                <div className="genral-section">
                    <h4>General</h4>
                    <ul>
                        <li>Sign-up</li>
                        <li>Contact Us</li>
                        <li>About us</li>
                        <li>Blog</li>
                        <li>Careers</li>
                        <li>Developers</li>
                        <li>Community</li>
                    </ul>
                </div>
                <div className="browse-section">
                    <h4>Browse Skill Matrix</h4>
                    <ul>
                        <li>Jobs</li>
                        <li>Skill Market</li>
                        <li>Skill Gap</li>
                        <li>Skill Passport</li>
                        <li>Skill Verification</li>
                        <li>Profile</li>
                    </ul>
                </div>
                <div className="user-section">
                    <h4>User's Blog</h4>
                    <ul>
                        <li>News</li>
                        <li>Privacy Policy</li>
                        <li>Articles</li>
                        <li>User Agreement</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Footer;
