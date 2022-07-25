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
    console.log(error);
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
    console.log(error);
  }
};

const getProjectMeasureHistory = async (key, ps = 1000) => {
  const metricKeys = process.env.SONAR_METRICS;

  try {
    const response = await axios.get(`/measures/search_history`, {
      params: {
        component: key,
        metrics: metricKeys,
        ps,
      },
    });

    return response.data.measures;
  } catch (error) {
    console.log(error);
  }
};

export default {
  listComponents,
  getProjectMeasures,
  getProjectMeasureHistory,
};
