import axios from "./axiosConfig.js";

const listComponents = async () => {
  const organization = process.env.SONAR_ORGANIZATION;

  try {
    const response = await axios.get("/components/search", {
      params: {
        organization,
        ps: 200,
      },
    });

    return response.data.components;
  } catch (error) {
    console.log(error.message);
  }
};

const getProjectMeasures = async (key) => {
  const metricKeys = process.env.SONAR_METRICS;

  try {
    const response = await axios.get(`/measures/component`, {
      params: {
        component: key,
        metricKeys,
      },
    });

    const component = response.data.component;
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
  try {
    const response = await axios.get(`/measures/search_history`, {
      params: {
        component: key,
        metrics,
        ps,
      },
    });

    return response.data.measures;
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  listComponents,
  getProjectMeasures,
  getProjectMeasureHistory,
};
