import { useState,useEffect } from 'react';
import './App.css';
import axios from "axios";


function App() {

  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Pune");
 const [weatherDescription, setWeatherDescription] = useState("");

 async function loadWeatherData() {
  try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0405d3c38f14f5a2f80d54d0f9357a7f`
      );
      setWeatherData(response.data);

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  useEffect(() => {
    loadWeatherData();
  }, [city]);



  useEffect(() => {
    setWeatherDescription(`${weatherData?.weather?.[0]?.main} (${weatherData?.weather?.[0]?.description})`);
}, [weatherData]);



  return (
    <div className="App">
     <h1 className="text-center mt-2">🌦️ Weather App 🌦️</h1>

     <input
          type="text"
          className="input-box"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
       <h2 className="mt-3">{weatherData.name}</h2>
        <h2> Description : {weatherDescription}</h2>
        {/* <h1 className="font">⛈</h1> */}
        
        <div className="d-flex justify-content-evenly mt-5">

          <h3 className="temperature-card shadow">
            Temp =
            {`${(weatherData?.main?.temp - 273).toFixed(2)}°C`} 
          </h3>

          <h3 className="temperature-card shadow ">
             Visibility = {`${weatherData?.visibility}m`} 
            
          </h3>

        <h3>  Humidity = {`${weatherData?.main?.humidity}%`}
          </h3> 
        </div>
      </div>
     
    
  );
}


export default App;
