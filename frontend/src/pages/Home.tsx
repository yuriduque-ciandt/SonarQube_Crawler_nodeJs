import React from 'react';
import styled from 'styled-components';
import { useSonarRepos } from '../context/SonarReposContext';
import RepoCard from '../components/RepoCard';

const Home = () => {
  const { repoList, isLoading, error } = useSonarRepos();
  return (
    <Container>
      <Title>Repositories</Title>
      <Content>
        {isLoading && <p>Loading...</p>}
        {error && <p>Unable to retrieve repositories from sonar...</p>}
        {repoList.map((repo) => (
          <RepoCard key={repo.key} repo={repo} />
        ))}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  padding: 20px 15% 20px 15%;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.div`
  padding-top: 20px;
`;

export default Home;
