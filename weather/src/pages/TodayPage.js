import React, { useEffect } from "react";
import '../App.css';
import HeaderDesk from "./HeaderDesk";
import { useState } from "react";
import HeaderMob from "../components/HeaderMob";
import HighlightsMob from "../components/HighlightsMob";
import { useLocation } from "react-router-dom";

export default function TodayPage() {

  const [weatherInfo, setWeatherInfo] = useState('');
  const [hourlyWeatherInfo, setHourlyWeatherInfo] = useState('');
  const [cityToFind, setCityToFind] = useState('Moscow');
  const [latOfCity, setLatOfCity] = useState('55.7522');
  const [lonOfCity, setLonOfCity] = useState('37.6156');

  const getWeatherInfo = (city) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},ru&APPID=02e86bee9708d5657625dd71232ccc5f`)
    .then(res => res.json())
    .then(data => {
        if (data.cod == 404) {
          setWeatherInfo('not found');
        } else {
          setWeatherInfo(data);
          setLatOfCity(data.coord.lat);
          setLonOfCity(data.coord.lon);
        }
    })
  }

  const getHourlyDailyWeatherInfo = () => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latOfCity}&lon=${lonOfCity}&appid=02e86bee9708d5657625dd71232ccc5f`)
    .then(res => res.json())
    .then(data => {
        setHourlyWeatherInfo(data);
    })
  }

  const getInputSearchValue = (e) => {
    setCityToFind(e.target.value);
  }

  const searchForCity = () => {
      getWeatherInfo(cityToFind)
      getHourlyDailyWeatherInfo()
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
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/414/414927.png" alt="weather icon"></img>
        }else {
          return <img className="forecast-weather-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146910.png" alt="weather icon"></img>
        } 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const location = useLocation();

  const changePage = () => {
    if (location.pathname == '/today') {
      return (
        hourlyWeatherInfo.list.map((hour, index) => {
          if (index < 7) {
            return (
              <div className="hour-weather">
                <p>{convertUnixTimeToHours(hour.dt)}0</p>
                {getImgWeatherForecast(hour.weather[0].main)}
                <p>{`${Math.round(hour.main.temp-273.15)}`}<span>°C</span></p>
               </div>
            )
          }
         })
      )
    } else if (location.pathname == '/tomorrow') {

      let newArr = '';

      hourlyWeatherInfo.list.find((hour, index, arr) => {
        let startIndex = '';
        if (convertUnixTimeToHours(hour.dt) == '3:0') {
          startIndex = arr.indexOf(hour);
          newArr = arr.slice(startIndex);
        } 
        return startIndex;
       })

       return newArr.map((hour, index) => {
          if (index < 7) {
            return (
              <div className="hour-weather">
                <p>{convertUnixTimeToHours(hour.dt)}0</p>
                {getImgWeatherForecast(hour.weather[0].main)}
                <p>{`${Math.round(hour.main.temp-273.15)}`}<span>°C</span></p>
              </div>
            )
          }
       })

    } else if (location.pathname == '/week') {

      // ПОПЫТКИ ПОЛУЧИТЬ КАЖДУЮ ПОСЛЕДУЮЩУЮ ДАТУ, ЧТОБЫ ВЫТАЩИТЬ В ИТОГЕ ДНЕВНУЮ ТЕМПЕРАТУРУ 
      // И ОФОРМИТЬ НА НЕДЕЛЮ, НО КАЖЕТСЯ IT'S WASTE OF TIME

      // const everyNth = (arr, n) => arr.filter((e, i) => i % n === 0);
      // let arrOfDates = [];
      //   hourlyWeatherInfo.list.map((hour, index) => {
      //     arrOfDates.push(convertUnixTimeToTodayDate(hour.dt))
      //    })
      //    let newArr = everyNth(arrOfDates, 7);

      //    hourlyWeatherInfo.list.map((hour, index) => {
      //     newArr.map((item, index) => {
      //       if (convertUnixTimeToTodayDate(hour.dt) == item) {
      //       }
      //      })
      //    })

         return <p className='paywall'>Oops, the copyright holder of the database does not give free access to such information. <br></br>Too bad, this was a great idea:(</p>   
    }
  }

  const convertUnixTimeToHours = (unix) => {
    var a = new Date(unix * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
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

const showSearchInput = () => {
  let input = document.querySelector('.search-input');
  input.classList.toggle('active-input');
}
    
  useEffect(() => {
      getWeatherInfo(cityToFind)
      getHourlyDailyWeatherInfo()
  }, []);
  
   return(
     <div className="weather-container">
       <aside>
         <div className="header-wrapper">
          <form className="search-box-desk" onSubmit={handleSubmit}>
            <label>
              <img className="search-icon" onClick={showSearchInput} src="https://cdn-icons-png.flaticon.com/512/149/149309.png"></img>
              <input className="search-input" onChange={getInputSearchValue} placeholder="Search for..."></input>
            </label>
            <button className="search-button" onClick={searchForCity}>Search</button>
          </form>
          <HeaderMob />
         </div>
         {weatherInfo != 'not found' ? 
          <div className="current-weather-info"> 
          <h2>{weatherInfo.name}</h2>
          {getImgWeather()}
          <p>{weatherInfo.weather[0].description}</p>
          <h1>{`${Math.round(weatherInfo.main.temp-273.15)}`}<span>°C</span></h1>
          <p className="">feels like {`${Math.round(weatherInfo.main.feels_like-273.15)}`}<span>°C</span></p>
          <p>{convertUnixTime(weatherInfo.dt)}</p>
        </div>
         : <p>Oops, it looks like you entered the city incorrectly, check your spelling and try again</p>}
        
       </aside>
       <main>
         {weatherInfo != 'not found' ? <HighlightsMob weatherInfo={weatherInfo}/> : ''}
         <HeaderDesk />
         {weatherInfo != 'not found' ? 
              <div className="hourly-weather">
              {changePage()}
          </div> : <div className="hour-weather" style={{padding:'20px 30px', width:'fit-content'}}>Not found :(</div>}
          <div className="hourly-weather">
          </div>
          <h3 className="highlights-title">Highlights</h3>
          <div className="highlights"> 
            <div className="highlight">
                <p>Wind</p>
                <div className="highlight-icon-value-box">
                  <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/1146/1146873.png" alt="h-icon"></img>
                  {weatherInfo != 'not found' ? <p>{weatherInfo.wind.speed}m/s</p> : <p></p>}
                </div>
            </div>
            <div className="highlight">
                <p>Humidity</p>
                <div className="highlight-icon-value-box">
                  <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/3314/3314011.png" alt="h-icon"></img>
                  {weatherInfo != 'not found' ? <p>{weatherInfo.main.humidity}%</p> : <p></p>}
                </div>
            </div>
            <div className="highlight">
                <p>Pressure</p>
                <div className="highlight-icon-value-box">
                  <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/5903/5903723.png" alt="h-icon"></img>
                  {weatherInfo != 'not found' ? <p>{`${weatherInfo.main.pressure * 0.75}`}mm Hg</p> : <p></p>}
                </div>
            </div>
            <div className="highlight">
                <p>Sunrise & sunset</p>
                <div className="highlight-icon-value-box">
                  <div className="sun-highlights-box">
                    <img className="highlights-icons" alt="h-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146889.png"></img>
                    {weatherInfo != 'not found' ? <span>{convertUnixTimeToHours(weatherInfo.sys.sunrise)}</span> : <p></p>}
                  </div>
                  <div className="sun-highlights-box">
                    <img className="highlights-icons" alt="h-icon" src="https://cdn-icons-png.flaticon.com/512/1146/1146886.png"></img>
                    {weatherInfo != 'not found' ? <span>{convertUnixTimeToHours(weatherInfo.sys.sunset)}</span> : <p></p>}
                  </div>
                </div>
            </div>
          </div>
       </main>
     </div>
   )
}