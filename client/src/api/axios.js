import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const API = axios.create({ baseURL: BASE_URL });

//Axios Interceptor, before each call send Authorixation in the headers as {Key,Value}=>{bearer,token}
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
//Sign In API call, sends the user fullName + email to the backend, authenticates and send {access_token,refresh_token,userID}
export const signIn = (credentials) => {
  return API.post(`auth/login`, credentials);
};
//Refresh Token api call, incase of expired Access Token, uses Refresh Token to get new Access Token,
//If both expired, signs out the user and asks for the user to re-login.
export const refreshSession = (token) => {
  return API.post(`/auth/refreshsession`, token);
};
//Sign Out, no api call just removes from localStorage.
export const signOut = () => {
  localStorage.removeItem("profile");
};
//Get User Info API call, asks from the backend the employee info for a specific ID,
//This function gets called when loading user's profile after login, or when visiting other's employees profiles.
export const getUserProfile = (id) => {
  return API.get(`/users/${id}`);
};
//Get All Employees API call, send back the list of all Employees for the "Worker's List" tab in each profile.
export const getAllEmployees = () => {
  return API.get("/users/all");
};
//Update the user's\Employee's Info such as First Name,Last Name.
export const updateUserInfo = (id, updatedInfo) => {
  return API.patch(`/users/${id}/update`, { updatedInfo });
};
//Creates New shift, only "Managers" can use this function.
export const createNewShift = (newShift) => {
  return API.post(`/shifts/newShift`, { newShift });
};

export const updateShift = (id, updatedShift) => {
  return API.post(`/shifts/updateShift/${id}`, { updatedShift });
};
//Delete Shift, only "Managers" can use this function.
export const deleteShift = (shiftID) => {
  return API.delete(`shifts/removeShift/${shiftID}`);
};

export const getShiftData = (shiftID) => {
  return API.get(`/shifts/${shiftID}`);
};
