import axios from "axios";

const instance = axios.create({
  baseURL: process.env.SONAR_URL,
  headers: {
    Authorization: `Bearer ${process.env.SONAR_KEY}`,
  },
});

export default instance;
