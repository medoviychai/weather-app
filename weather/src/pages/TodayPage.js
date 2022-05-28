import React, { useEffect } from "react";
import '../App.css';
import HeaderDesk from "./HeaderDesk";
import { useState } from "react";
import HeaderMob from "../components/HeaderMob";

export default function TodayPage() {

  const [weatherInfo, setWeatherInfo] = useState();
  const [hourlyWeatherInfo, setHourlyWeatherInfo] = useState();

  const getWeatherInfo = () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Moscow,ru&APPID=02e86bee9708d5657625dd71232ccc5f')
    .then(res => res.json())
    .then(data => {
        setWeatherInfo(data);
    })
  }

  const getHourlyDailyWeatherInfo = () => {
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat=55.7522&lon=37.6156&appid=02e86bee9708d5657625dd71232ccc5f')
    .then(res => res.json())
    .then(data => {
        setHourlyWeatherInfo(data);
    })
  }

  const getImgWeather = () => {
    if (weatherInfo.weather[0].main == 'Clouds') {
      return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png" alt="weather icon"></img>
    } else if (weatherInfo.weather[0].main == 'Sun') {
      return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/5903/5903519.png" alt="weather icon"></img>
    } else if (weatherInfo.weather[0].main == 'Rain') {
      return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146858.png" alt="weather icon"></img>
    } else if (weatherInfo.weather[0].main == 'Snow') {
      return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146878.png" alt="weather icon"></img>
    } else if (weatherInfo.weather[0].main == 'Wind') {
      return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146907.png" alt="weather icon"></img>
    } else if (weatherInfo.weather[0].main == 'Clear') {
      return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/414/414927.png" alt="weather icon"></img>
    } else {
      return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146910.png" alt="weather icon"></img>
    }
  }

  const getImgWeatherForecast = (weather) => {
        if (weather == 'Clouds') {
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146869.png" alt="weather icon"></img>
        } else if (weather == 'Sun') {
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/5903/5903519.png" alt="weather icon"></img>
        } else if (weather == 'Rain') {
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146858.png" alt="weather icon"></img>
        } else if (weather == 'Snow') {
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146878.png" alt="weather icon"></img>
        } else if (weather == 'Wind') {
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146907.png" alt="weather icon"></img>
        } else if (weather == 'Clear') {
          return <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/414/414927.png" alt="weather icon"></img>
        }else {
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146910.png" alt="weather icon"></img>
        } 
  }

  // const onClick = () => {
  //   console.log('time', convertUnixTime(weatherInfo.dt.replace(/\2022.*/, '')));
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const convertUnixTimeToHours = (unix) => {
    var a = new Date(unix * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ':' + min; 

    return time;
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
      // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ; 
      var time = date + ' ' + month + ' ' + year;
     
      return time;
  }
    
  useEffect(() => {
      getWeatherInfo()
      getHourlyDailyWeatherInfo()
  }, []);
  
   return(
     <div className="weather-container">
       <aside>
         <form className="search-box-desk" onSubmit={handleSubmit}>
          <label>
            <img className="search-icon" src="https://cdn-icons-png.flaticon.com/512/149/149309.png"></img>
            <input className="search-input" placeholder="Search for..."></input>
          </label>
          <button className="search-button">Search</button>
        </form>
        <HeaderMob />
        <div className="current-weather-info">
          <h2>{weatherInfo.name}</h2>
{/* <h2>City</h2> */}
          {getImgWeather()}
{/* <img className="current-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146856.png" alt="weather icon"></img> */}
          <p>{weatherInfo.weather[0].description}</p>
          <h1>{`${Math.round(weatherInfo.main.temp-273.15)}`}<span>°C</span></h1>
{/* <h1>12</h1> */}
          <p className="">feels like {`${Math.round(weatherInfo.main.feels_like-273.15)}`}<span>°C</span></p>
{/* <p>feels like 10</p> */}
          <p>{convertUnixTime(weatherInfo.dt)}</p>
{/* <p>time</p> */}
        </div>
       </aside>
       <main>
         <HeaderDesk />
          <div className="hourly-weather">
              {hourlyWeatherInfo.list.map((hour, index) => {
                if (index < 7) {
                  return (
                    <div className="hour-weather">
                      <p>{convertUnixTimeToHours(hour.dt)}0</p>
                      {getImgWeatherForecast(hour.weather[0].main)}
                      <p>{`${Math.round(hour.main.temp-273.15)}`}<span>°C</span></p>
                     </div>
                  )
                }
               })}
          </div>
          <h3 className="highlights-title">Highlights</h3>
          <div className="highlights"> 
            <div className="highlight">
                <p>Wind</p>
                <div className="highlight-icon-value-box">
                  <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/1146/1146873.png" alt="h-icon"></img>
                  <p>{weatherInfo.wind.speed}m/s</p>
                </div>
            </div>
            <div className="highlight">
                <p>Humidity</p>
                <div className="highlight-icon-value-box">
                  <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/3314/3314011.png" alt="h-icon"></img>
                  <p>{weatherInfo.main.humidity}%</p>
                </div>
            </div>
            <div className="highlight">
                <p>Pressure</p>
                <div className="highlight-icon-value-box">
                  <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/5903/5903723.png" alt="h-icon"></img>
                  <p>{`${weatherInfo.main.pressure * 0.75}`}mm Hg</p>
                </div>
            </div>
            <div className="highlight">
                <p>Sunrise & sunset</p>
                <div className="highlight-icon-value-box">
                  <div className="sun-highlights-box">
                    <img className="highlights-icons" alt="h-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146889.png"></img>
                    <span>{convertUnixTimeToHours(weatherInfo.sys.sunrise)}</span>
                  </div>
                  <div className="sun-highlights-box">
                    <img className="highlights-icons" alt="h-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146886.png"></img>
                    <span>{convertUnixTimeToHours(weatherInfo.sys.sunset)}</span>
                  </div>
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