import React, { useState } from 'react';
import styled from 'styled-components';

import { useSonarRepos } from '../context/SonarReposContext';
import RepoCard from '../components/RepoCard';
import Input from '../components/Input';

import { FiSearch } from 'react-icons/fi';

const Home = () => {
  const { repoList, isLoading, error, searchByName } = useSonarRepos();
  return (
    <Container>
      <HearderContent>
        <Title>Repositories {!!repoList.length && `(${repoList.length})`}</Title>
        <Input
          placeholder="Search repository"
          Icon={FiSearch}
          onChange={(e) => searchByName(e.target.value)}
        />
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
  padding: 20px 15% 20px 15%;
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
