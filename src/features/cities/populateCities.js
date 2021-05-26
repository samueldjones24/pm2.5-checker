import { getCities } from "../../services/getCities";

export default function citiesReducer(state = [], action) {
  switch (action.type) {
    case "cities/populateCities": {
      return action.payload;
    }
    default:
      return state;
  }
}

export function fetchCities(countryCode) {
  return async function fetchCitiesThunk(dispatch, getState) {
    const cities = await getCities(countryCode);
    dispatch({ type: "cities/populateCities", payload: cities });
  };
}
