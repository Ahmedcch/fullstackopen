function Countries(props) {
  return (
    <ul>
      {props.countries.map((country) => (
        <li key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => props.selectCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
}

export default Countries;
