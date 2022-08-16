import axios from "axios";

const sonarInstance = axios.create({
  baseURL: process.env.SONAR_URL,
  headers: {
    Authorization: `Bearer ${process.env.SONAR_KEY}`,
  },
});

const slackInstance = axios.create({
  baseURL: process.env.SONAR_URL,
  headers: {
    Authorization: `Bearer ${process.env.SONAR_KEY}`,
  },
});

export default { instance, slackInstance };
