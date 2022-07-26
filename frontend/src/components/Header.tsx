import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <Container>
      <Title>SonarQube crawler</Title>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
  padding: 5px;
  padding-left: 15px;
`;

const Title = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: white;
`;

export default Header;
