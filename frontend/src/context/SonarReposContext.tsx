import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { ISonarRepo } from '../interfaces/ISonarRepo';
import api from '../services/api';

const mock = [
  {
    key: 'Tapit-BE-Coupons',
    measures: [
      {
        metric: 'coverage',
        value: '78.9',
        bestValue: false
      },
      {
        metric: 'bugs',
        value: '0',
        bestValue: true
      },
      {
        metric: 'code_smells',
        value: '31',
        bestValue: false
      },
      {
        metric: 'duplicated_lines_density',
        value: '0.7',
        bestValue: false
      },
      {
        metric: 'vulnerabilities',
        value: '2',
        bestValue: false
      },
      {
        metric: 'security_hotspots_reviewed',
        value: '0.0',
        bestValue: false
      }
    ]
  },
  {
    key: 'Tapit-BE-Coupons 2',
    measures: [
      {
        metric: 'coverage',
        value: '78.9',
        bestValue: false
      },
      {
        metric: 'bugs',
        value: '0',
        bestValue: true
      },
      {
        metric: 'code_smells',
        value: '31',
        bestValue: false
      },
      {
        metric: 'duplicated_lines_density',
        value: '0.7',
        bestValue: false
      },
      {
        metric: 'vulnerabilities',
        value: '2',
        bestValue: false
      },
      {
        metric: 'security_hotspots_reviewed',
        value: '0.0',
        bestValue: false
      }
    ]
  }
];

type SonarReposContextData = {
  repoList: ISonarRepo[];
  isLoading: boolean;
  error: Error | null;
};

const SonarReposContext = createContext<SonarReposContextData>(null as any);

const SonarReposProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const [repoList, setRepoList] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  const state = {
    repoList,
    isLoading,
    error
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        //const { data: list } = await api.get<any[]>('/list');
        setRepoList(mock);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <SonarReposContext.Provider value={state}>{children}</SonarReposContext.Provider>;
};

export default SonarReposProvider;

export const useSonarRepos = () => useContext(SonarReposContext);
