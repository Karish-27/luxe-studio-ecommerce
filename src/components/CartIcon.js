import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const SVGIcon = styled.svg`
  width: 1.6rem;
  height: 1.6rem;
  fill: none;
  stroke: ${(props) => props.theme.text};
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Badge = styled.span`
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  background-color: #FFFFFF;
  color: #000000;
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
`;

const CartIcon = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <IconWrapper onClick={() => navigate('/cart')} aria-label="Shopping cart">
      <SVGIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </SVGIcon>
      {itemCount > 0 && <Badge>{itemCount > 9 ? '9+' : itemCount}</Badge>}
    </IconWrapper>
  );
};

export default CartIcon;
