import { useState, useEffect } from "react";
import countries from "./services/countries";
import Form from "./components/Form";
import Content from "./components/Content";

function App() {
  const [inputValue, setValue] = useState("");
  const [allCountries, setAllCountry] = useState([]);
  const [filteredCountry, setfilteredCountry] = useState([]);

  // Getting the value from the input & display the only matched values
  const inputVal = (e) => {
    const value = e.target.value;
    const matchingCountries =
      value.trim().length === 0
        ? allCountries
        : allCountries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(value.trim().toLowerCase()),
          );
    setValue(value);
    setfilteredCountry(matchingCountries);
  };
  // Getting the countries from the server
  const getCountries = () => {
    countries
      .getAll()
      .then((response) => {
        setAllCountry(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(getCountries, []);

  //
  const selectCountry = (country) => {
    // [country] -> To add the country object inside an array so we use map with it
    setfilteredCountry([country]);
  };

  return (
    <>
      <Form value={inputValue} change={inputVal} />
      <Content countries={filteredCountry} selectCountry={selectCountry} />
    </>
  );
}

export default App;
