import { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'


const App = () => {
    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios
            .get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => { 
                setCountries(response.data)
        })
    }, [])

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    )


    return(
        <div>
            <div>
                find countries <input value={search} onChange={handleSearchChange} />
            </div>

            {filteredCountries.length > 10 ? (
                <p>Too many matches, specify another filter</p>   
            ) : filteredCountries.length > 1 ? (
                filteredCountries.map(country => (
                    <p key={country.cca3}>{country.name.common}</p>
                ))
            ) : filteredCountries.length === 1 ? (
                <Country country={filteredCountries[0]} />
            ) : null}
        </div>
    )
}

export default App