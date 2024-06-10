import { getAuthToken } from "../../helper/axios_helper";

export const getToken = () => {
  let token = localStorage.getItem("data").accessToken;
  return token;
};

export const isLoggedIn = () => {
  let data = localStorage.getItem("isLogedIn");
  console.log("data boolean:" + data);
  if (data != null) return true;
  else return false;
};

//doLogin=>
export const doLogin = (data, next) => {
  localStorage.setItem("data", data);

  next();
};

//doLogout=>remove from localstorage
export const doLogout = (next) => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("isLogedIn");
  localStorage.removeItem("data");
  localStorage.removeItem("role");
  next();
};

export const setCurrentUserRole = (role) => {
  localStorage.setItem("role", role);
};

//get CurrentUser

export const getCurrentUserRole = () => {
  return localStorage.getItem("role");
};
