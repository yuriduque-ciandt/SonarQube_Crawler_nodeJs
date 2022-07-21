import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = process.env.SONAR_KEY;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const instance = axios.create({
  baseURL: process.env.SONAR_URL,
});

export default instance;
