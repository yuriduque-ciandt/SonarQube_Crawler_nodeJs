import React, { useState } from 'react';
import styled from 'styled-components';

import Chart from './Chart';

import { ISonarRepo, RepoMeasure } from '../interfaces/ISonarRepo';

type ComponentProps = {
  repo: ISonarRepo;
};

const RepoCard: React.FC<ComponentProps> = ({ repo }) => {
  const [selectedMetric, setSelectedMetric] = useState('');

  const formatMeasure = (measure: RepoMeasure) => {
    switch (measure.metric) {
      case 'coverage':
        return (
          <MetricLabel>
            Coverage: <b>{measure.value}</b>%
          </MetricLabel>
        );
      case 'bugs':
        return (
          <MetricLabel>
            Bugs: <b>{measure.value}</b>
          </MetricLabel>
        );
      case 'code_smells':
        return (
          <MetricLabel>
            Code Smells: <b>{measure.value}</b>
          </MetricLabel>
        );
      case 'duplicated_lines_density':
        return (
          <MetricLabel>
            Duplicated lines density: <b>{measure.value}</b>%
          </MetricLabel>
        );
      case 'security_hotspots_reviewed':
        return (
          <MetricLabel>
            Hotspots Reviewed: <b>{measure.value}</b>%
          </MetricLabel>
        );
      default:
        return (
          <MetricLabel>
            {measure.metric}: <b>{measure.value}</b>%
          </MetricLabel>
        );
    }
  };

  return (
    <Container>
      <Row>
        <Title>{repo.key}</Title>
      </Row>
      <Row>
        {repo.measures.map((measure) => (
          <MetricContent key={measure.metric}>
            <a
              href="#"
              onClick={() =>
                selectedMetric === measure.metric
                  ? setSelectedMetric('')
                  : setSelectedMetric(measure.metric)
              }>
              {formatMeasure(measure)}
            </a>
            {measure.bestValue ? <Emoji rotate={45}>🙂</Emoji> : <Emoji rotate={310}>😐</Emoji>}
          </MetricContent>
        ))}
      </Row>
      {selectedMetric && (
        <MetricGraphContent>
          <div>
            <p>{selectedMetric}</p>
          </div>
          <Chart />
        </MetricGraphContent>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  background-color: white;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MetricGraphContent = styled.div`
  transition: all 0.3s ease-in-out;
  height: 40vh;
`;

const MetricLabel = styled.p`
  color: ${({ theme }) => theme.colors.text};
  b {
    color: black;
    font-size: 18px;
  }
`;

const Emoji = styled.span<{ rotate: number }>`
  margin-left: 10px;
  filter: ${({ rotate }) => `hue-rotate(${rotate}deg)`};
`;

export default RepoCard;
