import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaMinusCircle } from 'react-icons/fa';

import Chart from './Chart';

import { ISonarRepo, RepoMeasure } from '../interfaces/ISonarRepo';

type ComponentProps = {
  repo: ISonarRepo;
};

const RepoCard: React.FC<ComponentProps> = ({ repo }) => {
  const [selectedMetric, setSelectedMetric] = useState('');

  const formatLabel = (label: string) => label.split('_').join(' ');

  repo.measures.forEach((m) => {
    m.isPercentage = [
      'coverage',
      'duplicated_lines_density',
      'security_hotspots_reviewed'
    ].includes(m.metric);
  });

  const getQualityDirection = (measure: RepoMeasure) => {
    if (measure.bestValue) {
      return <FaArrowAltCircleUp size={24} color="green" />;
    }
    return <FaArrowAltCircleDown size={24} color="red" />;
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
              <MetricStats>
                <div>
                  <b>
                    {measure.value}
                    {measure.isPercentage && '%'}
                  </b>
                  {getQualityDirection(measure)}
                </div>
                <p>{formatLabel(measure.metric)}</p>
              </MetricStats>
            </MetricLink>
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
  padding: 20px;
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

const MetricStats = styled.div`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  b {
    color: black;
    font-size: 18px;
    margin-right: 10px;
  }
  p {
    color: ${({ theme }) => theme.colors.text};
    ::first-letter {
      text-transform: capitalize;
    }
  }
`;

export default RepoCard;
