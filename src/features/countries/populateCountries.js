import { getCountries } from "../../services/getCountries";
import { sortBy } from "../../utils/sortBy";

export default function countriesReducer(state = [], action) {
  switch (action.type) {
    case "countries/populateCountries": {
      return action.payload;
    }
    default:
      return state;
  }
}

export const countriesLoaded = (countries) => ({
  type: "countries/populateCountries",
  payload: countries,
});

export const fetchCountries = () => async (dispatch) => {
  const countries = await getCountries();
  const sortedCountries = sortBy(countries, "name");
  dispatch(countriesLoaded(sortedCountries));
};
