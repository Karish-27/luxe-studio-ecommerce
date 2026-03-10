import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.2);
  width: fit-content;
`;

const Btn = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

const Count = styled.span`
  width: 3rem;
  text-align: center;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.text};
  border-left: 1px solid rgba(255,255,255,0.2);
  border-right: 1px solid rgba(255,255,255,0.2);
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuantitySelector = ({ value, min = 1, max = 10, onChange }) => {
  return (
    <Wrapper>
      <Btn onClick={() => onChange(value - 1)} disabled={value <= min}>−</Btn>
      <Count>{value}</Count>
      <Btn onClick={() => onChange(value + 1)} disabled={value >= max}>+</Btn>
    </Wrapper>
  );
};

export default QuantitySelector;
