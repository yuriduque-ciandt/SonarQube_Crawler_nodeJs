import sonarApi from "../apis/sonarApi.js";

const getMetrics = async () => {
  const metricKeys = process.env.SONAR_METRICS;
  let metrics = await sonarApi.getMetrics();

  metrics = metrics.filter(({ key }) => metricKeys.includes(key));
  metrics = metrics.map(({ key, type, name, direction }) => ({
    key,
    type,
    name,
    direction,
  }));

  return metrics;
};

export default getMetrics;
