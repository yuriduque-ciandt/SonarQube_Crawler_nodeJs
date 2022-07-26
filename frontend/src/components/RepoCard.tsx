import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Chart from './Chart';

import { ISonarRepo, RepoMeasure } from '../interfaces/ISonarRepo';

type ComponentProps = {
  repo: ISonarRepo;
};

const RepoCard: React.FC<ComponentProps> = ({ repo }) => {
  const [selectedMetric, setSelectedMetric] = useState('');

  const formatLabel = (label: string) => label.split('_').join(' ');

  const formatMeasure = (measure: RepoMeasure) => {
    switch (measure.metric) {
      case 'coverage':
      case 'duplicated_lines_density':
      case 'security_hotspots_reviewed':
        return (
          <MetricLabel>
            {formatLabel(measure.metric)}: <b>{measure.value}%</b>
          </MetricLabel>
        );
      default:
        return (
          <MetricLabel>
            {formatLabel(measure.metric)}: <b>{measure.value}</b>
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
            <MetricLink
              href="#"
              active={selectedMetric === measure.metric}
              onClick={() =>
                selectedMetric === measure.metric
                  ? setSelectedMetric('')
                  : setSelectedMetric(measure.metric)
              }>
              {formatMeasure(measure)}
            </MetricLink>
            {measure.bestValue ? <Emoji rotate={45}>🙂</Emoji> : <Emoji rotate={310}>😐</Emoji>}
          </MetricContent>
        ))}
      </Row>
      {selectedMetric && (
        <MetricGraphContent>
          <Title>{formatLabel(selectedMetric)}</Title>
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
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
  ::first-letter {
    text-transform: capitalize;
  }
`;

const MetricContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MetricGraphContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const MetricLink = styled.a<{ active: boolean }>`
  text-decoration: none;
  ${({ active }) =>
    active &&
    css`
      border-bottom: 2px solid black;
    `}
`;

const MetricLabel = styled.p`
  color: ${({ theme }) => theme.colors.text};
  b {
    color: black;
    font-size: 18px;
  }
  ::first-letter {
    text-transform: capitalize;
  }
`;

const Emoji = styled.span<{ rotate: number }>`
  margin-left: 10px;
  filter: ${({ rotate }) => `hue-rotate(${rotate}deg)`};
`;

export default RepoCard;
