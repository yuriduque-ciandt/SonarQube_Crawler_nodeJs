export interface ISonarRepo {
  key: string;
  measures: RepoMeasure[];
}

export interface RepoMeasure {
  bestValue: false;
  direction: number;
  key: string;
  name: string;
  type: string;
  value: string;
}

export interface ISonarRepoHistory {
  projecKey: string;
  measures: MeasureWithHistory[];
}

export interface MeasureWithHistory {
  metric: string;
  history: History[];
}

export interface History {
  date: string;
  value: string;
}
