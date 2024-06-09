export const getToken = () => {
  let token = localStorage.getItem("data").accessToken;
  return token;
};
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  // console.log("data boolean:" + data);
  if (data == null) return false;
  else return true;
};
//doLogin=>

export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

//doLogout=>remove from localstorage
export const doLogout = (next) => {
  localStorage.removeItem("data");
  next();
};
