import sonarApi from "../apis/sonarApi.js";
import getMetrics from "./getMetrics.js";

const getProjectsMeasures = async () => {
  const components = await sonarApi.listComponents();
  const componentKeys = components.map(({ key }) => key);

  const metrics = await getMetrics();

  const data = await Promise.all(
    componentKeys.map(async (componentKey) => {
      return await _getProjectMeasures(componentKey, metrics);
    })
  );

  return data;
};

const _getProjectMeasures = async (componentKey, metrics) => {
  let measures = await sonarApi.getProjectMeasures(componentKey);

  measures = await Promise.all(
    measures.map(async (measure) => {
      const metricData = metrics.find(({ key }) => measure.metric === key);

      return {
        ...metricData,
        value: measure.value,
        bestValue: measure.bestValue,
      };
    })
  );

  return {
    key: componentKey,
    measures,
  };
};

export default getProjectsMeasures;
