import sonarApi from "../apis/sonarApi.js";
import getMetrics from "./getMetrics.js";

const getProjectsMeasures = async () => {
  const components = await sonarApi.listComponents();
  const componentKeys = components.map(({ key }) => key);

  const metrics = await getMetrics();

  const data = await Promise.all(
    componentKeys.map(async (componentKey) => {
      const project = await _getProjectMeasures(componentKey, metrics);
      project.status = await sonarApi.getProjectStatus(componentKey);
      project.history = await _getProjectHistory(componentKey);

      return project;
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

const _getProjectHistory = async (componentKey) => {
  let history = await await sonarApi.getProjectMeasureHistory(
    componentKey,
    process.env.SONAR_METRICS
  );

  return {
    key: componentKey,
    history,
  };
};

export default getProjectsMeasures;
