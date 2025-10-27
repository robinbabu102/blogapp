import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true // this enables sending cookies for session auth
});

export default api;
