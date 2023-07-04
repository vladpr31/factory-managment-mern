import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);
console.log(process.env.REACT_APP_BASE_URL);
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((req, res) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).access_token
    }`;
  }
  console.log("axios request:", req);
  return req;
});
API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return err.response.data;
  }
);

export const signIn = (credentials) => {
  return API.post(`auth/login`, credentials);
};
export const signOut = () => {
  localStorage.removeItem("profile");
};

export const getUserProfile = (id) => {
  return API.get(`/users/${id}`);
};

export const refreshSession = (token) => {
  return API.post(`/auth/refreshsession`, token);
};

export const getAllEmployees = () => {
  return API.get("/users/all");
};

export const updateUserInfo = (id, updatedInfo) => {
  return API.patch(`/users/${id}/update`, { id, updatedInfo });
};

export const createNewShift = (id, newShift) => {
  return API.post(`/users/${id}/newShift`, { id, newShift });
};

export const deleteShift = (shiftID) => {
  return API.delete(`users/removeShift/${shiftID}`);
};
