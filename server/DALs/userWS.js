const axios = require("axios");
const url = "https://jsonplaceholder.typicode.com/users";

const getUserByEmail = (email) => {
  return axios.get(url + "?email=" + email);
};

const getUserByName = (fullName) => {
  let name = fullName.split(" ");
  return axios.get(url + "?name=" + name[0] + "+" + name[1]);
};

const getUserByCredentials = (fullName, email) => {
  return axios.get(url + "?email=" + email + "&" + "name=" + fullName);
};
module.exports = { getUserByEmail, getUserByName, getUserByCredentials };
