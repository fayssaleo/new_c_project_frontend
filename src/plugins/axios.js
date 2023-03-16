import axios from "axios";
const CustomizedAxios = axios;
CustomizedAxios.defaults.baseURL = "http://127.0.0.1:8000/api/";
var token;
CustomizedAxios.defaults.headers.common["Content-Type"] = "multipart/form-data";
CustomizedAxios.defaults.headers.common["Accept"] = "application/json";

if (localStorage.ClaimCach) {
  token = JSON.parse(localStorage.ClaimCach);
  CustomizedAxios.defaults.headers.common = {
    Authorization: `Bearer ${token.usersModule.token}`,
    Accept: "application/json",
  };
}

/* CustomizedAxios.defaults.headers.common["Accept"] = "application/json";
CustomizedAxios.defaults.headers.common = {
  Authorization: `Bearer ` + token,
}; */

/*
//
/* if (departementModule.state.currentdepartement != null) {
  
  axios.defaults.headers.common = {
    Authorization: `Bearer ${departementModule.state.currentdepartement.token}`,
  };
} */
/*axios.interceptors.request.use(
  function (config) {
    const token = store.getters.getCurrentdepartement.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);*/

export default CustomizedAxios;
