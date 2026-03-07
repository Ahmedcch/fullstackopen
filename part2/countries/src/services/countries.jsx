import axios from "axios";

const server = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(server);
  return request.then((response) => response.data);
};

export default { getAll };
