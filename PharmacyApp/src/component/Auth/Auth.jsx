import { useState } from "react";

export const isLoggedIn = () => {
  let data = localStorage.getItem("isLogedIn");
  console.log("data boolean:" + data);
  return data === "true";
};

//doLogout=>remove from localstorage
export const doLogout = (next) => {
  next();
};

export const setCurrentUserRole = (role) => {
  localStorage.setItem("role", role);
};

//get CurrentUserRole
export const getCurrentUserRole = () => {
  return localStorage.getItem("role");
};
