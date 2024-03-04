import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './App.css';

function App() {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [airQuality, setAirQuality] = useState('');

  useEffect(() => {
    const fetchData = () => {
      console.log("calling")
      const fetchLastTemperatureValue = () => {
        const temperatureRef = firebase.database().ref('/ZeoData/temperature_value').orderByKey().limitToLast(1);
        temperatureRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const latestEntry = Object.values(data)[0];
            setTemperature(latestEntry.value);
          } else {
            setTemperature('');
          }
        });
      };

      const fetchLastHumidityValue = () => {
        const humidityRef = firebase.database().ref('/ZeoData/Humidity_value').orderByKey().limitToLast(1);
        humidityRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const latestEntry = Object.values(data)[0];
            setHumidity(latestEntry.value);
          } else {
            setHumidity('');
          }
        });
      };

      const fetchLastAirQualityValue = () => {
        const airQualityRef = firebase.database().ref('/ZeoData/Air_quality').orderByKey().limitToLast(1);
        airQualityRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const latestEntry = Object.values(data)[0];
            setAirQuality(latestEntry.value);
          } else {
            setAirQuality('');
          }
        });
      };

      fetchLastTemperatureValue();
      fetchLastHumidityValue();
      fetchLastAirQualityValue();
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Air Quality Monitoring</h1>
      <div className="card">
        <h2>Temperature</h2>
        <p>{temperature !== '' ? `${temperature} °C` : 'Loading...'}</p>
      </div>
      <div className="card">
        <h2>Humidity</h2>
        <p>{humidity !== '' ? `${humidity} %` : 'Loading...'}</p>
      </div>
      <div className="card">
        <h2>Air Quality</h2>
        <p>{airQuality !== '' ? airQuality : 'Loading...'}</p>
      </div>
    </div>
  );
}

export default App;
