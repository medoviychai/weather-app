import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function HeaderMob() {

    const [menuClass, setMenuClass] = useState('mob-list-nav');
    const [isMenuClose, changeVisabilityMenu] = useState(true);

    const showMenu = () => {
        if (isMenuClose) {
            setMenuClass('mob-list-nav-active')
            changeVisabilityMenu(false)
        } else if (!isMenuClose) {
            setMenuClass('mob-list-nav')
            changeVisabilityMenu(true)
        }

    }
    const closeMenu = () => {
        setMenuClass('mob-list-nav')
        changeVisabilityMenu(true)
    }

    const [todayPage, setTodayPage] = useState('today-page');
    const [tomorrowPage, setTomorrowPage] = useState('tomorrow-page');
    const [weekPage, setWeekPage] = useState('week-page');
  
    const location = useLocation();
  
    useEffect(() => {
      if (location.pathname == '/today') {
        setTodayPage('active-page');
        setTomorrowPage('tomorrow-page');
        setWeekPage('week-page');
      } else if (location.pathname == '/tomorrow') {
        setTomorrowPage('active-page');
        setTodayPage('today-page');
        setWeekPage('week-page');
      } else if (location.pathname == '/week') {
        setWeekPage('active-page');
        setTomorrowPage('tomorrow-page');
        setTodayPage('today-page');
      }
  
    },[location]);

    const showSearchInput = () => {
        let input = document.querySelector('.search-input-mob');
        input.classList.toggle('active-input');
    }
  
   return (
    <nav className="mob-nav">
        <div className="hidden-nav">
            <img className="menu-button-img" onClick={showMenu} src="https://cdn-icons.flaticon.com/png/512/3945/premium/3945664.png?token=exp=1653774528~hmac=2f5a0e5857524410d11572b95ecd0afe"></img>
        </div>
      <ul className={menuClass}>
        <li><Link to='/today' className={todayPage} onClick={closeMenu}>Today</Link></li>
        <li><Link to='/tomorrow' className={tomorrowPage} onClick={closeMenu}>Tomorrow</Link></li>
        <li><Link to='/week' className={weekPage} onClick={closeMenu}>Week</Link></li>
        {/* <li><button className="switch-theme-button">Dark</button></li> */}
      </ul>
  </nav>
   )
}