import React, { useState } from 'react';
import styled from 'styled-components';

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImage = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #111111;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.03);
    }
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Thumb = styled.div`
  width: 70px;
  height: 90px;
  overflow: hidden;
  cursor: pointer;
  opacity: ${(props) => props.active ? 1 : 0.5};
  border: 2px solid ${(props) => props.active ? props.theme.text : 'transparent'};
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover { opacity: 1; }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageGallery = ({ images, alt }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <GalleryWrapper>
      <MainImage>
        <img src={images[activeIndex]} alt={`${alt} - view ${activeIndex + 1}`} />
      </MainImage>
      {images.length > 1 && (
        <Thumbnails>
          {images.map((img, i) => (
            <Thumb
              key={i}
              active={i === activeIndex}
              onClick={() => setActiveIndex(i)}
            >
              <img src={img} alt={`${alt} thumbnail ${i + 1}`} />
            </Thumb>
          ))}
        </Thumbnails>
      )}
    </GalleryWrapper>
  );
};

export default ImageGallery;
