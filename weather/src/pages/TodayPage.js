import React, { useEffect } from "react";
import '../App.css';
import Header from "./Header";
import { useState } from "react";

export default function TodayPage() {

  const [weatherInfo, setWeatherInfo] = useState();
  // useEffect(() => {
  //   fetch('http://api.openweathermap.org/data/2.5/weather?q=Moscow,ru&APPID=02e86bee9708d5657625dd71232ccc5f')
  //   .then(res => res.json())
  //   .then(data => {
  //       // console.log(data);
  //       setWeatherInfo(data);
  //   })
  const fetWeatherInfo = () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Moscow,ru&APPID=c6ed4a758afcaea2f4daee80c2e545b8')
    .then(res => res.json())
    .then(data => {
        setWeatherInfo(data);
    })
  }

  const onClick = () => {
    console.log('time', convertUnixTime(weatherInfo.dt.replace(/\2022.*/, '')));
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const convertUnixTime = (unix) => {
      var a = new Date(unix * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
  }
    
  useEffect(() => {
      fetWeatherInfo()
  });
  
   return(
     <div className="weather-container">
       <aside>
         <form className="search-box" onSubmit={handleSubmit}>
          <label>
            <img className="search-icon" src="https://cdn-icons-png.flaticon.com/512/149/149309.png"></img>
            <input className="search-input" placeholder="Search for..."></input>
          </label>
          <button className="search-button" onClick={onClick}>Search</button>
        </form>
        <div className="current-weather-info">
          <h2>{weatherInfo.name}</h2>
          <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146856.png" alt="weather icon"></img>
          <h1>{`${weatherInfo.main.temp-273,15}`}<span>°C</span></h1>
          <p className="">feels like {`${weatherInfo.main.feels_like-273,15}`}<span>°C</span></p>
          <p>{convertUnixTime(weatherInfo.dt)}</p>
        </div>
       </aside>
       <main>
         <Header />
          <div className="hourly-weather">
            <div className="hour-weather">
              <p>day</p>
              <img alt="icon"></img>
              <p>10</p>
            </div>
            <div className="hour-weather">
              <p>day</p>
              <img alt="icon"></img>
              <p>10</p>
            </div>
            <div className="hour-weather">
              <p>day</p>
              <img alt="icon"></img>
              <p>10</p>
            </div>
            <div className="hour-weather">
              <p>day</p>
              <img alt="icon"></img>
              <p>10</p>
            </div>
            <div className="hour-weather">
              <p>day</p>
              <img alt="icon"></img>
              <p>10</p>
            </div>
            <div className="hour-weather">
              <p>day</p>
              <img alt="icon"></img>
              <p>10</p>
            </div>
            <div className="hour-weather">
              <p>day</p>
              <img alt="icon"></img>
              <p>10</p>
            </div>
          </div>
          <h3 className="highlights-title">Highlights</h3>
          <div className="highlights"> 
            <div className="highlight">
                <p>Wind</p>
                <div className="highlight-icon-value-box">
                  <img alt="h-icon"></img>
                  <p>value</p>
                </div>
            </div>
            <div className="highlight">
                <p>Humidity</p>
                <div className="highlight-icon-value-box">
                  <img alt="h-icon"></img>
                  <p>value</p>
                </div>
            </div>
            <div className="highlight">
                <p>Pressure</p>
                <div className="highlight-icon-value-box">
                  <img alt="h-icon"></img>
                  <p>value</p>
                </div>
            </div>
            <div className="highlight">
                <p>Sunrise & sunset</p>
                <div className="highlight-icon-value-box">
                  <img alt="h-icon"></img>
                  <p>value</p>
                </div>
            </div>
          </div>
       </main>
     </div>
   )
}



// export default class TodayPage extends React.Component {

//   state = {
//     weatherInfo: '',
//   }

//   getWeatherInfo = () => {
//     fetch('http://api.openweathermap.org/data/2.5/weather?q=Moscow,ru&APPID=c6ed4a758afcaea2f4daee80c2e545b8')
//     .then(res => res.json())
//     .then(data => {
//         this.setState({weatherInfo: data});
//     })
//   }

//   componentDidMount() {
//     this.getWeatherInfo()
//   }

//   onClick = () => {
//     console.log('state', this.state.weatherInfo);
//   }

//   render () {
//     return (
//       <div className="weather-container">
//       {/* <p>{weatherInfo.name}</p> */}

//       <aside>
//         <form className="search-box" onSubmit={}>
//          <label>
//            <img className="search-icon" src="https://cdn-icons-png.flaticon.com/512/149/149309.png"></img>
//            <input className="search-input" placeholder="Search for..."></input>
//          </label>
//          <button className="search-button" onClick={this.onClick}>Search</button>
//        </form>
//        <div className="current-weather-info">
//          <h2>city</h2>
//          <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146856.png" alt="weather icon"></img>
//          <h1>12<span>°C</span></h1>
//          <p className="">feels like 10<span>°C</span></p>
//          <p>Monday</p>
//        </div>
//       </aside>
//       <main>
//         <Header />
//          <div className="hourly-weather">
//            <div className="hour-weather">
//              <p>day</p>
//              <img alt="icon"></img>
//              <p>10</p>
//            </div>
//            <div className="hour-weather">
//              <p>day</p>
//              <img alt="icon"></img>
//              <p>10</p>
//            </div>
//            <div className="hour-weather">
//              <p>day</p>
//              <img alt="icon"></img>
//              <p>10</p>
//            </div>
//            <div className="hour-weather">
//              <p>day</p>
//              <img alt="icon"></img>
//              <p>10</p>
//            </div>
//            <div className="hour-weather">
//              <p>day</p>
//              <img alt="icon"></img>
//              <p>10</p>
//            </div>
//            <div className="hour-weather">
//              <p>day</p>
//              <img alt="icon"></img>
//              <p>10</p>
//            </div>
//            <div className="hour-weather">
//              <p>day</p>
//              <img alt="icon"></img>
//              <p>10</p>
//            </div>
//          </div>
//          <h3 className="highlights-title">Highlights</h3>
//          <div className="highlights"> 
//            <div className="highlight">
//                <p>Wind</p>
//                <div className="highlight-icon-value-box">
//                  <img alt="h-icon"></img>
//                  <p>value</p>
//                </div>
//            </div>
//            <div className="highlight">
//                <p>Humidity</p>
//                <div className="highlight-icon-value-box">
//                  <img alt="h-icon"></img>
//                  <p>value</p>
//                </div>
//            </div>
//            <div className="highlight">
//                <p>Pressure</p>
//                <div className="highlight-icon-value-box">
//                  <img alt="h-icon"></img>
//                  <p>value</p>
//                </div>
//            </div>
//            <div className="highlight">
//                <p>Sunrise & sunset</p>
//                <div className="highlight-icon-value-box">
//                  <img alt="h-icon"></img>
//                  <p>value</p>
//                </div>
//            </div>
//          </div>
//       </main>
//     </div>
//     )
//   }
// }