import axios from "axios";
import { apiKey, BASE_URL } from "./../config/common";

export default async function fetchData(path, param = null) {
  const response = await axios.get(`${BASE_URL}/${path}`, {
    params: {
      api_key: apiKey,
      ...param,
    },
  });
  return response?.data;
}
