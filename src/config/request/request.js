import axios from "axios";
import { loadState } from "../storage";

function getAccessToken() {
  const user = loadState("user");
  return user ? user.accessToken : null;
}

const request = axios.create({
  baseURL: "http://localhost:3000",
});

request.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default request;
