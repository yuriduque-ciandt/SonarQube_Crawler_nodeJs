import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { ISonarRepo } from '../interfaces/ISonarRepo';
import api from '../services/api';

type SonarReposContextData = {
  repoList: ISonarRepo[];
  isLoading: boolean;
  error: Error | null;
  searchByName: (name: string) => void;
};

const SonarReposContext = createContext<SonarReposContextData>(null as any);

const SonarReposProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [repoList, setRepoList] = useState<ISonarRepo[]>([]);
  const [error, setError] = useState<any>(null);

  const getRepoList = async () => {
    try {
      setLoading(true);
      const { data: list } = await api.get<ISonarRepo[]>('/api/sonar/getProjectsMeasures');
      setRepoList(list);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRepoList();
  }, []);

  const searchByName = async (name: string) => {
    if (!name) {
      return getRepoList();
    }
    return setRepoList((prev) => prev.filter((r) => r.key.toLowerCase().includes(name)));
  };

  const state = {
    repoList,
    isLoading,
    error,
    searchByName
  };

  return <SonarReposContext.Provider value={state}>{children}</SonarReposContext.Provider>;
};

export default SonarReposProvider;

export const useSonarRepos = () => useContext(SonarReposContext);
