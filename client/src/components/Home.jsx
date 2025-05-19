import React, { useState, useEffect } from 'react';
import axios from 'axios';
 

const Home = () => {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [searchedWeathers, setSearchedWeathers] = useState([]);

  // Get current location weather
  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=3045dd712ffe6e702e3245525ac7fa38`
        );
        setCurrentWeather(res.data);
      } catch (error) {
        console.error("Failed to fetch current location weather:", error);
      }
    });
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  const handleSearch = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=3045dd712ffe6e702e3245525ac7fa38`
      );
      setSearchedWeathers(prev => [...prev, res.data]);
      setCity('');
      await axios.post('https://weatherreportproj-backend.onrender.com/cities', { name: city });
    } catch (error) {
      alert("City not found or network error.");
    }
  };

  return (
    <div className="home-container">
      <div className="content-wrapper">

        {/* Search Box FIRST */}
        <div className="search-box">
          <h2>Check the Weather</h2>
          <div className="input-group">
            <input
              className="search-input"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter city..."
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* THEN show searched weather results */}
        {searchedWeathers.map((weather, index) => (
          <div key={index} className="weather-card">
            <h3>Searched City: {weather.name}</h3>
            <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          </div>
        ))}

        {/* Show current location at the bottom */}
        {currentWeather && (
          <div className="weather-card current-weather">
            <h3>Your Location: {currentWeather.name}</h3>
            <p><strong>Temperature:</strong> {currentWeather.main.temp} °C</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
