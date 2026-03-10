import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
`;

const Star = styled.span`
  color: ${(props) => (props.filled ? '#f5c518' : 'rgba(255,255,255,0.25)')};
  font-size: ${(props) => props.size || '0.9rem'};
`;

const Count = styled.span`
  font-size: ${(props) => props.theme.fontxs};
  color: ${(props) => props.theme.grey};
  margin-left: 0.3rem;
`;

const StarRating = ({ rating, reviewCount, size }) => {
  return (
    <Container>
      {[1,2,3,4,5].map(i => (
        <Star key={i} filled={i <= Math.round(rating)} size={size}>★</Star>
      ))}
      {reviewCount !== undefined && <Count>({reviewCount})</Count>}
    </Container>
  );
};

export default StarRating;
