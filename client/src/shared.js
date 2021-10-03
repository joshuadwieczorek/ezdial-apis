import axios from "axios";


const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://easydial1.herokuapp.com";


const baseUrl = axios.create({ baseURL: apiUrl, withCredentials: true });

const errHandling = (error) => Promise.reject(error);

const reqHandling = (config) => {
  const obj = { ...config };
  const token = localStorage.getItem("token");
  if (token) obj.headers["authorization"] = `Bearer ${token}`;
  // obj.withCredentials=true;
  return obj;
};

const resHandling = (response) => response;

baseUrl.interceptors.request.use(reqHandling, errHandling);
baseUrl.interceptors.response.use(resHandling, errHandling);
// baseUrl.defaults.withCredentials = true
// export default axiosInstance;

export { baseUrl };
