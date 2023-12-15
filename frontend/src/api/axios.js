import axios from "axios";
const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios.create({
  baseURL: import.meta.env.VITE_APP_API,
});
