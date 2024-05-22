import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_LOCAL_URL;
console.log("base----", baseUrl);
export const axiosInstance = axios.create({
   baseURL: `https://eduapp.zapto.org/api/v1`,
  // baseURL: `http://localhost:5000/api/v1`,
});
