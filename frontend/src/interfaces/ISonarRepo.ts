export interface ISonarRepo {
  key: string;
  measures: RepoMeasure[];
}

export interface RepoMeasure {
  metric: string;
  value: string;
  bestValue: boolean;
  isPercentage?: boolean;
}
