import axios from "./axiosConfig.js";

const listComponents = async () => {
  console.log("sonarApi - '/listComponents' - received");
  const organization = process.env.SONAR_ORGANIZATION;

  try {
    const response = await axios.get("/components/search", {
      params: {
        organization,
        ps: 200,
      },
    });

    console.log("sonarApi - '/listComponents' - done");
    return response.data.components;
  } catch (error) {
    console.log(error.message);
  }
};

const getProjectMeasures = async (key) => {
  console.log("sonarApi - '/getProjectMeasures' - received");
  const metricKeys = process.env.SONAR_METRICS;

  try {
    const response = await axios.get(`/measures/component`, {
      params: {
        component: key,
        metricKeys,
      },
    });

    const component = response.data.component;

    console.log("sonarApi - '/getProjectMeasures' - done");
    return component.measures;
  } catch (error) {
    console.log(error.message);
  }
};

const getProjectMeasureHistory = async (
  key,
  metrics = process.env.SONAR_METRICS,
  ps = 1000
) => {
  console.log("sonarApi - '/getProjectMeasureHistory' - received");
  const response = await axios.get(`/measures/search_history`, {
    params: {
      component: key,
      metrics,
      ps,
    },
  });

  console.log("sonarApi - '/getProjectMeasureHistory' - done");
  return response.data.measures;
};

const getMetrics = async () => {
  console.log("sonarApi - '/getMetrics' - received");
  const response = await axios.get(`/metrics/search`, {
    params: { ps: 200 },
  });

  console.log("sonarApi - '/getMetrics' - done");
  return response.data.metrics;
};

export default {
  listComponents,
  getProjectMeasures,
  getProjectMeasureHistory,
  getMetrics,
};
