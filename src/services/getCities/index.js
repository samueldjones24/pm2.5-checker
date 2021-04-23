import axios from "axios";
import { get } from "../../utils/get";

export async function getCities(countryCode) {
  const cities = await axios.get(
    `https://api.openaq.org/v2/cities?country=${countryCode}`
  );
  return get(cities, "data.results", []);
}
