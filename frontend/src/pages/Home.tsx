import React from 'react';
import styled from 'styled-components';

import { useSonarRepos } from '../context/SonarReposContext';
import RepoCard from '../components/RepoCard';
import Input from '../components/Input';

import { FiSearch } from 'react-icons/fi';

const Home = () => {
  const { repoList, isLoading, error } = useSonarRepos();
  return (
    <Container>
      <HearderContent>
        <Title>Repositories</Title>
        <Input placeholder="Search repository" Icon={FiSearch} />
      </HearderContent>
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

const HearderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const Content = styled.div`
  padding-top: 20px;
`;

export default Home;
