import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faChartPie,
  faClipboardList,
  faBriefcase,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import "../pagescss/Sidebar.css";

const Sidebar = () => {
  const navItems = [
    { name: "Home", path: "/", icon: faHouse },
    { name: "Profile", path: "/profile", icon: faUser },
    { name: "Skill Gap", path: "/skill-gap", icon: faChartPie },
    { name: "Skill Verification", path: "/skill-verification", icon: faClipboardList },
    { name: "Jobs", path: "/jobs", icon: faBriefcase },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Trimios</h2>

      <nav>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Settings Section (Placed Separately) */}
      <div className="settings-section">
        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
        >
          <FontAwesomeIcon icon={faCogs} className="nav-icon" />
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
