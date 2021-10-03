import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
const NavBar = () => (
  <nav className="navMe">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dial-page">Dial</Link>
      </li>
      <li>
        <Link to="/settings"> Settings</Link>
      </li>
      <li>
        <Link to="/contacts"> Contacts</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
