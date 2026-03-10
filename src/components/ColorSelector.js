import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
`;

const Swatch = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${(props) => props.hex};
  border: 2px solid ${(props) => props.selected ? props.theme.text : 'transparent'};
  outline: 2px solid ${(props) => props.selected ? props.theme.text : 'transparent'};
  outline-offset: 2px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover {
    outline-color: rgba(255,255,255,0.5);
  }
`;

const ColorName = styled.span`
  font-size: ${(props) => props.theme.fontxs};
  color: ${(props) => props.theme.grey};
  text-transform: capitalize;
  margin-left: 0.5rem;
`;

const ColorSelector = ({ colors, selected, onChange }) => {
  const selectedColor = colors.find(c => c.name === selected);

  return (
    <Wrapper>
      {colors.map((color) => (
        <Swatch
          key={color.name}
          hex={color.hex}
          selected={selected === color.name}
          onClick={() => onChange(color.name)}
          title={color.name}
          aria-label={`Select color: ${color.name}`}
        />
      ))}
      {selectedColor && <ColorName>{selectedColor.name}</ColorName>}
    </Wrapper>
  );
};

export default ColorSelector;
