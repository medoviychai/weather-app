import React, { useEffect, useState } from "react";

export default function HighlightsMob(props) {

    const [weatherInfo, setWeatherInfo] = useState(props.weatherInfo);

    useEffect(() => {
        setWeatherInfo(props.weatherInfo);
    }, [props.weatherInfo]);

    return (
    <div className="highlights-mob"> 
        <div className="highlight-mob">
            <div className="highlight-icon-value-box-mob">
                <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/1146/1146873.png" alt="h-icon"></img>
                <p>{weatherInfo.wind.speed}m/s</p>
            </div>
        </div>
        <div className="highlight-mob">
            <div className="highlight-icon-value-box-mob">
                <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/3314/3314011.png" alt="h-icon"></img>
                <p>{weatherInfo.main.humidity}%</p>
            </div>
        </div>
        <div className="highlight-mob">
            <div className="highlight-icon-value-box-mob">
                <img className="highlights-icons" src="https://cdn-icons-png.flaticon.com/512/5903/5903723.png" alt="h-icon"></img>
                <p>{`${weatherInfo.main.pressure * 0.75}`}mm Hg</p>
            </div>
        </div>
    </div>
    )
}