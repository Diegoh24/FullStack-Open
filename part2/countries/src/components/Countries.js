import Country from './Country';

const Countries = ({countries, showCountry}) => {
  if (countries.length > 10) return (<p>Too many matches, be more specific</p>)
  if (countries.length === 1) return <Country {...countries[0]} />

  return (
  <ul>
    {countries.map(country => 
      <li key={country.name.common}>
        {country.name.common}
        <button onClick={() => showCountry(country)}>
          Show
        </button>
      </li>
    )}
  </ul>
  )
}

export default Countries;
