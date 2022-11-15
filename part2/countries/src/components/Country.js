import { useState, useEffect} from "react";
import axios from 'axios';

let Country = ({name, capital, area, languages, tld }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    let query = `${capital},${tld[0].slice(1)}`

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apiKey}`
    const iconsUrl = code => `http://openweathermap.org/img/wn/${code}@2x.png`;

    const getWeather = async() => {
      let res = await axios.get(url);
      let data = res.data;

      let wind = data.wind.speed;
      let temp = (+data.main.temp - 273.15).toFixed(2);
      let icon = iconsUrl(data.weather[0].icon);

      setWeather({temp, icon, wind,});
    }
    
    getWeather();
  }, [])

  return (
  <>
    <h1>{name.common}</h1>
    <p>Capital: {capital}</p>
    <p>Area: {area}</p>

    <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([key, language]) =>
          <li key={key}>{language}</li>
        )}
      </ul>
    
    <h2>Weather in {capital}</h2>
    <p>temperature {weather.temp} Celsius</p>
    <img src={weather.icon}></img>
    <p>Wind {weather.wind} m/s</p>
  </>
  )
}

export default Country;