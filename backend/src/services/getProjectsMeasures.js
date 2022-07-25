import sonarApi from "../apis/sonarApi.js";
import getMetrics from "./getMetrics.js";

const getProjectsMeasures = async () => {
  const components = await sonarApi.listComponents();
  const componentKey = components.map(({ key }) => key);

  const metrics = await getMetrics();

  const data = await Promise.all(
    componentKey.map(async (key) => {
      return await getProjectMeasures(key, metrics);
    })
  );

  return data;
};

const getProjectMeasures = async (key, metrics) => {
  let measures = await sonarApi.getProjectMeasures(key);
  measures = measures.map((measure) => {
    const metricData = metrics.find(({ key }) => measure.metric === key);
    return {
      ...metricData,
      value: measure.value,
      bestValue: measure.bestValue,
    };
  });

  return {
    key,
    measures,
  };
};

export default getProjectsMeasures;
