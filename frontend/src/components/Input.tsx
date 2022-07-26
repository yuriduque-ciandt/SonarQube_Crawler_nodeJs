import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type ComponentProps = {
  Icon?: React.ElementType;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<ComponentProps> = ({ Icon, value, placeholder, onChange }) => {
  return (
    <StyledInput>
      {Icon && <Icon />}
      <input value={value} placeholder={placeholder} onChange={onChange} />
    </StyledInput>
  );
};

const StyledInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  padding-left: 10px;

  background-color: white;
  border: 1px solid #c4c4c4;
  border-radius: 5px;

  svg {
    margin-right: 10px;
  }

  input {
    flex-grow: 1;
    height: 24px;
    border: none;
    padding: 5px;
    border-radius: 5px;
  }
`;

export default Input;
