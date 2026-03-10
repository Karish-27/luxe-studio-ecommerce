import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';

const Card = styled.div`
  position: relative;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }

  &:hover .card-img {
    transform: scale(1.05);
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  aspect-ratio: 3/4;
  background: #1a1a1a;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  padding: 1.5rem 1rem 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuickAddBtn = styled.button`
  background: #fff;
  color: #202020;
  border: none;
  padding: 0.6rem 1.2rem;
  font-family: 'Sirin Stencil';
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const TagBadge = styled.span`
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: ${(props) => props.sale ? '#c0392b' : 'rgba(255,255,255,0.9)'};
  color: ${(props) => props.sale ? '#fff' : '#202020'};
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.5rem;
  font-family: 'Sirin Stencil';
  z-index: 2;
`;

const Info = styled.div`
  padding: 1rem 0 0.5rem;
`;

const ProductName = styled.h3`
  font-family: 'Kaushan Script';
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.25rem;

  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s;
    &:hover { opacity: 0.75; }
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const Price = styled.span`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.text};
  font-weight: 600;
`;

const OriginalPrice = styled.span`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  text-decoration: line-through;
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const isOnSale = product.originalPrice > product.price;
  const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)] || product.sizes[0];
  const defaultColor = product.colors[0]?.name || '';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultSize, defaultColor, 1);
  };

  return (
    <Card>
      <Link to={`/product/${product.id}`}>
        <ImageWrapper>
          <CardImg
            className="card-img"
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
          />
          {isOnSale && <TagBadge sale>Sale</TagBadge>}
          {!isOnSale && product.tags.includes('new') && <TagBadge>New</TagBadge>}
          {product.tags.includes('limited') && !isOnSale && !product.tags.includes('new') && (
            <TagBadge>Limited</TagBadge>
          )}
          <Overlay className="overlay">
            <QuickAddBtn onClick={handleQuickAdd}>Quick Add</QuickAddBtn>
          </Overlay>
        </ImageWrapper>
      </Link>
      <Info>
        <ProductName>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </ProductName>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <PriceRow>
          <Price>${product.price.toFixed(2)}</Price>
          {isOnSale && <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>}
        </PriceRow>
      </Info>
    </Card>
  );
};

export default ProductCard;
