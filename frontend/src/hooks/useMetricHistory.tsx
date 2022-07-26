import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ISonarRepoHistory, MeasureWithHistory } from '../interfaces/ISonarRepo';

import api from '../services/api';

const useMetricHistory = () => {
  const [isLoading, setLoading] = useState(false);
  const [metricHistory, setMetricHistory] = useState<MeasureWithHistory>();
  const [error, setError] = useState<any>(null);

  const getMetricHistory = async (repoKey: string, metricKey: string) => {
    try {
      setLoading(true);
      const { data } = await api.get<ISonarRepoHistory>(
        `/api/sonar//getProjectMeasureHistory?projecKey=${repoKey}&metricKey=${metricKey}`
      );
      setMetricHistory(data.measures[0]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    metricHistory,
    isLoading,
    error,
    getMetricHistory
  };
};

export default useMetricHistory;
