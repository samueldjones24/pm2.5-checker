import { combineReducers } from "redux";

import countriesReducer from "./features/countries/populateCountries";
import citiesReducer from "./features/cities/populateCities";
import measurementsReducer from "./features/measurements/populateMeasurements";

const rootReducer = combineReducers({
  countries: countriesReducer,
  cities: citiesReducer,
  measurements: measurementsReducer,
});

export default rootReducer;
