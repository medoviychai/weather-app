import React from "react";
import { Link } from "react-router-dom";

export default function HeaderDesk() {
  
   return(
    <nav className="desktop-nav"> 
      <ul>
        <li><Link to='/today'>Today</Link></li>
        <li><Link to='/tomorrow'>Tomorrow</Link></li>
        <li><Link to='/week'>Week</Link></li>
      </ul>
    <button className="switch-theme-button">Dark</button>
  </nav>
   )
}