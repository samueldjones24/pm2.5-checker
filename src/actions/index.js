export const populateCountries = (countries) => ({
  type: "countries/populateCountries",
  payload: countries,
});

export const populateCities = (cities) => ({
  type: "cities/populateCities",
  payload: cities,
});

export const populateMeasurements = (measurements) => ({
  type: "measurements/populateMeasurements",
  payload: measurements,
});
