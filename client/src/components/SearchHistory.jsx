import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_KEY = '3045dd712ffe6e702e3245525ac7fa38';

const SearchHistory = () => {
  const [weatherData, setWeatherData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCitiesAndWeather = async () => {
      try {
        const res = await axios.get('https://weatherreportproj-backend.onrender.com/cities');
        const cityList = res.data;

        const weatherPromises = cityList.map(city =>
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${API_KEY}`)
            .then(response => ({
              name: city.name,
              temp: response.data.main.temp,
              humidity: response.data.main.humidity,
              wind: response.data.wind.speed,
              condition: response.data.weather[0].description,
            }))
            .catch(err => ({
              name: city.name,
              error: true,
            }))
        );

        const results = await Promise.all(weatherPromises);
        setWeatherData(results);
      } catch (err) {
        console.error("Error fetching city list or weather data:", err);
      }
    };

    fetchCitiesAndWeather();
  }, []);

 return (
  <div className="search-history-container">
    <h2>Search History with Weather</h2>
    <table className="weather-table">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature (°C)</th>
          <th>Humidity (%)</th>
          <th>Wind (m/s)</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.map((city, index) => (
          <tr key={index}>
            <td>
              <Link to={`/weather/${city.name}`}>{city.name}</Link>
            </td>
            {city.error ? (
              <td colSpan="4">Error fetching weather data</td>
            ) : (
              <>
                <td>{city.temp}</td>
                <td>{city.humidity}</td>
                <td>{city.wind}</td>
                <td>{city.condition}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
    <button className='btn' onClick={()=>navigate('/')}>Back</button>
  </div>
);
};

export default SearchHistory;
