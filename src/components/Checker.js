import { useState, useEffect } from "react";
import { get } from "../utils/get";
import { useSelector, useDispatch } from "react-redux";
import { fetchCities } from "../features/cities/populateCities";
import { fetchMeasurements } from "../features/measurements/populateMeasurements";
import { fetchCountries } from "../features/countries/populateCountries";

export function Checker() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const { countries, cities, measurements } = useSelector((state) => ({
    countries: state.countries,
    cities: state.cities,
    measurements: state.measurements,
  }));

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSubmitCountry = (e) => {
    e.preventDefault();
    const countryCode = e.target.value;
    setCountry(countryCode);
    dispatch(fetchCities(countryCode));
  };

  const handleSubmitCity = (e) => {
    e.preventDefault();
    const city = e.target.value;
    setCity(city);
    dispatch(fetchMeasurements(country, city));
  };

  const pm25Level = get(
    measurements.find((m) => m.parameter === "pm25"),
    "value",
    0
  );
  let pm25Rating;
  let ratingStyle;
  if (Number(pm25Level) < 20) {
    pm25Rating = "Good";
    ratingStyle = "--good";
  } else if (Number(pm25Level) > 20 && Number(pm25Level) < 35) {
    pm25Rating = "Moderate";
    ratingStyle = "--moderate";
  } else {
    pm25Rating = "Unhealthy";
    ratingStyle = "--unhealthy";
  }

  return (
    <div className="item">
      <div className="margin-bottom-small">
        <label htmlFor="countries">Choose a country: </label>

        <select
          autoFocus
          name="countries"
          id="countries"
          onChange={(e) => handleSubmitCountry(e)}
          value={country}
        >
          <option value="">Select option</option>
          {countries.map((country, index) => (
            <option key={`${country}-${index}`} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {Boolean(cities.length) && (
        <div className="margin-bottom-small animated">
          <label htmlFor="cities">Choose a city: </label>

          <select
            autoFocus
            name="cities"
            id="cities"
            onChange={(e) => handleSubmitCity(e)}
            value={city}
          >
            <option value="">Select option</option>
            {cities.map(({ city }, index) => (
              <option key={`${city}-${index}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}
      {Boolean(measurements.length) && (
        <div className="margin-bottom-small animated">
          <p>
            Current level: {pm25Level} μg/m3{" "}
            <span className={`pm25-rating pm25-rating${ratingStyle}`}>
              {pm25Rating}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
