import Countries from "./Countries";
import Country from "./Country";
function Content(props) {
  if (props.countries.length === 1) {
    return <Country countries={props.countries} />;
  }
  if (props.countries.length <= 10) {
    return (
      <Countries
        countries={props.countries}
        selectCountry={props.selectCountry}
      />
    );
  }
  return <p>Too many matches, specify another filter</p>;
}

export default Content;
