const axios = require("axios");
const url = "https://jsonplaceholder.typicode.com/users";

//uses Web Service, basically for user's auth for login.

//return user by email.
const getUserByEmail = (email) => {
  return axios.get(url + "?email=" + email);
};
//returns user by name.
const getUserByName = (fullName) => {
  let name = fullName.split(" ");
  return axios.get(url + "?name=" + name[0] + "+" + name[1]);
};
//returns user by email and full name.
const getUserByCredentials = (fullName, email) => {
  return axios.get(url + "?email=" + email + "&" + "name=" + fullName);
};
module.exports = { getUserByEmail, getUserByName, getUserByCredentials };
