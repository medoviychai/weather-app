import React from "react";
import { Link } from "react-router-dom";

export default function HeaderMob() {
  
   return(
    <nav className="mob-nav">
        <div className="hidden-nav">
            <img className="search-icon" src="https://cdn-icons-png.flaticon.com/512/149/149309.png"></img>
            {/* <div>
                <input id="menu-toggle" type="checkbox" />
                <label className="menu-button" for="menu-toggle">
                    <span></span>
                </label>
            </div> */}
        </div>
        {/* <form className="search-box-mob">
            <label>
            <input className="search-input" placeholder="Search for..."></input>
            </label>
            <button className="search-button">Search</button>
        </form> */}
      <ul className="mob-list-nav">
        <li><Link to='/today'>Today</Link></li>
        <li><Link to='/tomorrow'>Tomorrow</Link></li>
        <li><Link to='/week'>Week</Link></li>
        <li><button className="switch-theme-button">Dark</button></li>
      </ul>

  </nav>
   )
}