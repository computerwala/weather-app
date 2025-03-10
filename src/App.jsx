import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FaTemperatureFull } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaCity } from "react-icons/fa6";
import { GiWhirlwind } from "react-icons/gi";
import axios from 'axios';

function App() {
  const [city, setCity] = useState();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL; 

  const url = `${API_URL}q=${city}&appid=${API_KEY}`;
  console.log(url);

  const handleCity = (e) => {
    setCity(e.target.value);
    console.log(city);
  }

  const fetchData = async () => {
    setIsLoading(true);
    axios.get(url)
    .then((res) => {
      console.log(res.data);
      setData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log("Error fetching data", err.response.data.message);
      alert(err.response.data.message);
      setIsLoading(false);
    })
  }

  const handleSubmit = () => {
    fetchData();
  }

  return (
    <>
      <h1>Open weather app</h1>
      <h2>Enter a city name to get the weather</h2>
      <div>
        <input type="text" placeholder="Enter a city name" onChange={handleCity} />
        <button className='btn' onClick={handleSubmit}> {isLoading ? "Loading..." : "submit"} </button>
      </div>

      <h3>Weather Details {city}</h3>
      <div className="flex"> 
        <h4><FaCity/></h4>
        {city ? <p>{city}</p> : <p>City</p>}
      </div>

      {data ? (
        <>
          <div className="flex">
            <h4><FaTemperatureFull/></h4>
            <p>{data && data.main && ((data.main.temp - 32) * 5/9).toFixed(1)} &deg;C</p>          </div>

          <div className="flex">
            <h4><WiHumidity/></h4>
            <p>{data && data.main && data.main.humidity } g/kg</p>
          </div>

          <div className="flex">
            <h4><GiWhirlwind/></h4>
            <p>{data && data.wind && data.wind.speed } km/h</p>
          </div>
        </>
      ) : (
        <p>Weather details</p>
      )}
    </>
  )
}

export default App
