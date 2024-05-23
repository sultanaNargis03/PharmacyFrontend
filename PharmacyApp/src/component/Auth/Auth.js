//isLoggedIn=>if token exsits
export const getToken = () => {
  let token = localStorage.getItem("data").accessToken;
  return token;
};
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
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

//get currentUser
export const getCurrentUserDetail = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user.currentUserName;
  } else return undefined;
};
