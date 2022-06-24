import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function HeaderDesk() {

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
  
   return(
    <nav className="desktop-nav"> 
      <ul>
        <li><Link to='/today' className={todayPage}>Today</Link></li>
        <li><Link to='/tomorrow' className={tomorrowPage}>Tomorrow</Link></li>
        <li><Link to='/week' className={weekPage}>Week</Link></li>
      </ul>
    {/* <button className="switch-theme-button">Dark</button> */}
  </nav>
   )
}