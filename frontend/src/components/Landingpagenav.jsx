import React from 'react'
import { Link } from 'react-router-dom'

function Landingpagenav() {
  return (
    <div className='landingnav'>
        <nav>
        <img src="/assets/logo.png" alt="Logo" className="logo" />
            <ul>
            <li>Home</li>
            <li>Download</li>
            <li>About</li>
            <li>Contact</li>
            </ul>
            <Link to="/login">
            <h4 className="login">Login /</h4>
            </Link>
           <Link to="/register">
            <h4 className="register"> Register</h4>
            </Link>
        </nav>
    </div>
  )
}

export default Landingpagenav
