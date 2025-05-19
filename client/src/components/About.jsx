import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const Navigate = useNavigate()
  return (
    <>
    <div className="about-container">
      <div className="about-text">
        <h2>About This Weather Report App</h2>
        <p>
          This Weather App provides real-time weather updates using the OpenWeatherMap API.
          You can search for weather conditions in any city, view your search history, and
          access detailed forecasts including temperature, humidity, wind speed, and more.
        </p>
        <p>
          <strong>Technologies Used:</strong> React.js, Node.js, Express.js, MongoDB, and OpenWeatherMap API.
        </p>
      </div>
     
    </div>
     <button onClick={()=>Navigate('/')} className='btn-one'>Find Weather</button>
    </>
  );
};

export default About;
