import React from 'react'
import logoheader from '../assets/logo-header.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
function Navbar() {
  return (
    <div>
      <div className="logo">
        <img src={logoheader} alt="Logo" />
      </div>
      <div className="navbarcontent">
        <ul>
            <li>
              <NavLink to="/search">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications">
                <FontAwesomeIcon icon={faBell} />
              </NavLink>
            </li>
            <li><img src="" alt="Profile " /></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
