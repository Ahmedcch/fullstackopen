import axios from "axios";
// Using the part 4 backend server and database
const baseURL = "/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const create = async (newNoteObject) => {
  // To send the logged in user token with the new note
  const config = {
    headers: { Authorization: token },
  };
  //   console.log(token);
  const response = await axios.post(baseURL, newNoteObject, config);
  //   console.log(response.data);
  return response.data;
};

export default { create, setToken };
