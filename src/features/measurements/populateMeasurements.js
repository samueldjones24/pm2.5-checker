import { getMeasurements } from "../../services/getMeasurements";

export default function measurementsReducer(state = [], action) {
  switch (action.type) {
    case "measurements/populateMeasurements": {
      return action.payload;
    }
    default:
      return state;
  }
}

export function fetchMeasurements(countryCode, city) {
  return async function fetchMeasurementsThunk(dispatch, getState) {
    const measurements = await getMeasurements({ countryCode, city });
    dispatch({
      type: "measurements/populateMeasurements",
      payload: measurements,
    });
  };
}
