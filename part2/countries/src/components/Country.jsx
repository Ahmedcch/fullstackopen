import Weather from "./Weather";

function Country(props) {
  const country = props.countries[0];
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        Capital: {country.capital} <br /> Area: {country.area}
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
      {
        <Weather
          name={country.capital[0]}
          lat={country.capitalInfo.latlng[0]}
          lon={country.capitalInfo.latlng[1]}
        />
      }
    </>
  );
}

export default Country;
