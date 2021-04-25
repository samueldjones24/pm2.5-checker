import { useState, useEffect } from "react";
import { getCountries } from "../../services/getCountries";
import { getCities } from "../../services/getCities";
import { getMeasurements } from "../../services/getMeasurements";
import { sortBy } from "../../utils/sortBy";
import { get } from "../../utils/get";

export function Checker() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [measurements, setMeasurements] = useState([]);

  async function fetchMeasurements({ countryCode, city }) {
    const response = await getMeasurements({ countryCode, city });
    setMeasurements(response);
  }

  async function fetchCities(countryCode) {
    const response = await getCities(countryCode);
    setCities(response);
  }

  useEffect(() => {
    async function fetchCountries() {
      const response = await getCountries();
      const sortedCountries = sortBy(response, "name");
      setCountries(sortedCountries);
    }
    fetchCountries();
  }, []);

  const handleSubmitCountry = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
    fetchCities(e.target.value);
  };

  const handleSubmitCity = (e) => {
    e.preventDefault();
    setCity(e.target.value);
    fetchMeasurements({ countryCode: country, city: e.target.value });
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
