import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const getAuthToken = () => {
  return window.localStorage.getItem("auth_token");
};

export const getUsername = () => {
  const token = getAuthToken();

  if (token) {
    // const decoded = jwtDecode(token, { header: true });
    const decoded = jwtDecode(token);
    // console.log(decoded);
    const username = decoded.sub;
    return username;
  }
};

export const setAuthHeader = (token) => {
  if (token !== null) {
    window.localStorage.setItem("auth_token", token);
  } else {
    window.localStorage.removeItem("auth_token");
  }
};

axios.defaults.baseURL = "http://localhost:8088";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (method, url, data) => {
  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
    headers = { Authorization: `Bearer ${getAuthToken()}` };
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });
};
// Add Axios interceptor to handle 401 responses
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("auth_token");
      window.localStorage.removeItem("isLogedIn");
      window.localStorage.removeItem("data");
      window.localStorage.removeItem("role");

      window.location.href = "/sessionexpired";
      console.log("expired");
    }
    return Promise.reject(error);
  }
);
