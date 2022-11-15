import { useState, useEffect } from 'react'
import axios from 'axios';

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)

  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;
    if (name.length <= 2) return;
    axios
      .get(url)
      .then(res => {
        if (res.status === 200) {
          setCountry(res.data.pop())
        } else {
          return;
        }
      }, [])
      .catch(err => alert(err));
  })

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div> 
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/> 
    </div>
  )  
}
/*
  how would you?
  so you have a useField custom Hook, sets the value of the input elem
  useState function
*/

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    let name = nameInput.value;
    setName(name);
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App