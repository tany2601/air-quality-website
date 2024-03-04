import React, { useState, useEffect } from 'react';
import firebase from './firebase';
import './App.css';

function App() {
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [airQuality, setAirQuality] = useState('');

  useEffect(() => {
    const fetchData = () => {
      const dataRef = firebase.database().ref('/ZeoData');
      dataRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const tempEntry = data.temperature_value;
          const humidityEntry = data.Humidity_value;
          const airQualityEntry = data.Air_quality;

          if (tempEntry) {
            const latestTempEntry = Object.values(tempEntry)[0];
            setTemperature(latestTempEntry.value);
          }
          if (humidityEntry) {
            const latestHumidityEntry = Object.values(humidityEntry)[0];
            setHumidity(latestHumidityEntry.value);
          }
          if (airQualityEntry) {
            const latestAirQualityEntry = Object.values(airQualityEntry)[0];
            setAirQuality(latestAirQualityEntry.value);
          }
        }
      });

      // Return a cleanup function to unsubscribe when component unmounts
      return () => {
        dataRef.off();
      };
    };

    fetchData();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      const dataRef = firebase.database().ref('/ZeoData');
      dataRef.off();
    };
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
