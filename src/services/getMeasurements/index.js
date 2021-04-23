import axios from "axios";
import { get } from "../../utils/get";

export async function getMeasurements({ countryCode, city }) {
  const measurements = await axios.get(
    `https://api.openaq.org/v1/measurements?country=${countryCode}&city=${city}`
  );
  return get(measurements, "data.results", []);
}
