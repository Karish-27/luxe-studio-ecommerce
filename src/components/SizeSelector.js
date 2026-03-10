import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SizeBtn = styled.button`
  min-width: 3rem;
  height: 3rem;
  padding: 0 0.75rem;
  background: ${(props) => props.selected ? props.theme.text : 'transparent'};
  color: ${(props) => props.selected ? props.theme.body : props.theme.text};
  border: 1px solid ${(props) => props.selected ? props.theme.text : 'rgba(255,255,255,0.3)'};
  cursor: pointer;
  font-family: 'Sirin Stencil';
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    border-color: ${(props) => props.theme.text};
    background: ${(props) => props.selected ? props.theme.grey : 'rgba(255,255,255,0.1)'};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    text-decoration: line-through;
  }
`;

const SizeSelector = ({ sizes, selected, onChange }) => {
  return (
    <Wrapper>
      {sizes.map((size) => (
        <SizeBtn
          key={size}
          selected={selected === size}
          onClick={() => onChange(size)}
        >
          {size}
        </SizeBtn>
      ))}
    </Wrapper>
  );
};

export default SizeSelector;
