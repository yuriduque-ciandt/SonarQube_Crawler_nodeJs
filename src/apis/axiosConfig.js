import axios from "axios";

const sonarInstance = axios.create({
  baseURL: process.env.SONAR_URL,
  headers: {
    Authorization: `Bearer ${process.env.SONAR_KEY}`,
  },
});

const slackInstance = axios.create({
  baseURL: process.env.SLACK_URL,
  headers: {
    ContentType: "application/json",
  },
});

export default { sonarInstance, slackInstance };
