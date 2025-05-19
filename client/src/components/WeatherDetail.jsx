import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WeatherDetails = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3045dd712ffe6e702e3245525ac7fa38`)
      .then(res => setWeather(res.data));
  }, [city]);

  return (
    <div>
      {weather ? (
        <>
          <h2>Weather Details for {city}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
          <p>Condition: {weather.weather[0].description}</p>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
};

export default WeatherDetails;
