import { useEffect, useState, } from 'react'
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState({searching: false});

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
      .catch(err => alert(err));
  }, [])

  const searchByName = event => {
    event.preventDefault();
    let search = event.target.value;
    if (!search) return setSearch({searching: false})
    
    let match = new RegExp(search)
    let results = countries.filter(country => 
      (new RegExp(match.source, match.flags + 'i')).test(country.name.common)
    );

    setSearch({searching: true, results,});
  }

  const showCountry = (country) => {
    setSearch({searching: true, results: [country]})
  }

  let countriesToShow = search.searching ? search.results : [];

  return (
    <div>
      <h2>Countries</h2>
        <Filter onChange={searchByName} />
        <Countries countries={countriesToShow} showCountry={showCountry}/>
    </div>
  )
}

export default App