import axios from "axios";
import { get } from "../../utils/get";

export async function getCountries() {
  const countries = await axios.get("https://api.openaq.org/v2/countries");
  return get(countries, "data.results", []);
}
