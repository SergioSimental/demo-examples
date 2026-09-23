import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
    const [weather, setWeather] = useState(null)
    
    useEffect(() => {
        const api_key = import.meta.env.VITE_WEATHER_API_KEY

        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
            )
            .then(response => {
                setWeather(response.data)
            })
    }, [country])

    return (
        <div>
            <h1>{country.name.common}</h1>

            <p>capital {country.capital}</p>
            <p>area {country.area}</p>

            <h2>languages:</h2>

            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>

            <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
            />

            <h2>Weather in {country.capital}</h2>

            {weather && (
                <div>
                    <p>temperature {weather.main.temp} Celsius</p>

                    <img 
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />

                    <p>wind {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    )
}

export default Country