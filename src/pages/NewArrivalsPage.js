import { motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding-top: ${(props) => props.theme.navHeight};
`;

const Hero = styled.div`
  padding: 4rem 2rem 3rem;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
`;

const BackBtn = styled(Link)`
  color: ${(props) => props.theme.grey};
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.2s;
  position: absolute;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const PageTitle = styled(motion.h1)`
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 300;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.75rem;
`;

const Subtitle = styled(motion.p)`
  color: #999999;
  font-size: ${(props) => props.theme.fontmd};
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.1em;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 48em) {
    padding: 1.5rem 1rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const ResultCount = styled.span`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const SortSelect = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${(props) => props.theme.text};
  padding: 0.5rem 0.75rem;
  font-size: ${(props) => props.theme.fontsm};
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  outline: none;

  option {
    background: #000000;
    color: #fff;
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem 1.5rem;

  @media (max-width: 80em) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 64em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 30em) {
    grid-template-columns: 1fr;
  }
`;

const NewArrivalsPage = () => {
  const [sort, setSort] = useState('newest');

  const newArrivalProducts = useMemo(() => {
    let result = products.filter((p) => p.tags.includes('new-arrivals'));

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        break;
    }

    return result;
  }, [sort]);

  return (
    <PageTransition>
      <Wrapper>
        <Hero>
          <BackBtn to="/">&#8592; Back</BackBtn>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            New Arrivals
          </PageTitle>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The latest additions to our curated collection
          </Subtitle>
        </Hero>

        <Container>
          <TopBar>
            <ResultCount>
              {newArrivalProducts.length}{' '}
              {newArrivalProducts.length === 1 ? 'product' : 'products'}
            </ResultCount>
            <SortSelect value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </SortSelect>
          </TopBar>

          <Grid>
            {newArrivalProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </Grid>
        </Container>
      </Wrapper>
    </PageTransition>
  );
};

export default NewArrivalsPage;
