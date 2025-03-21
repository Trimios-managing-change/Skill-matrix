import React from 'react'
import { Link } from 'react-router-dom'
import '../pagescss/landingpage.css'

function Landingpagenav() {
  return (
    <div className='landingnav'>
    
        <div className="logo">
        <img src="/assets/logo.png" alt="Logo"  />
        </div>
        <div className="nav-container">
            <ul>
                <li>Home</li>
                <li>Download</li>
                <li>About</li>
                <li>Contact</li>
            
            <li id='login-register'>
            <Link to="/login">
                <h4 className="login">Login/</h4>
            </Link>
            
            <Link to="/register">
                <h4 className="register">Register</h4>
            </Link>
            </li>
            </ul>
        </div>
    
</div>

  )
}

export default Landingpagenav
