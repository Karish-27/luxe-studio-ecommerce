import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import PageTransition from '../components/PageTransition';
import products from '../data/products';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding-top: ${(props) => props.theme.navHeight};
`;

const Hero = styled.div`
  padding: 3rem 2rem 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 0;
`;

const PageTitle = styled(motion.h1)`
  font-family: 'Cormorant Garamond', serif;
  font-size: ${(props) => props.theme.fontxxxl};
  font-weight: 300;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
`;

const Subtitle = styled(motion.p)`
  color: ${(props) => props.theme.grey};
  font-size: ${(props) => props.theme.fontmd};
  letter-spacing: 0.1em;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  gap: 3rem;

  @media (max-width: 64em) {
    flex-direction: column;
    padding: 1.5rem 1rem;
    gap: 2rem;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const ResultCount = styled.span`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 1.5rem;

  @media (max-width: 48em) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 1rem;
  }

  @media (max-width: 30em) {
    grid-template-columns: 1fr;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  color: ${(props) => props.theme.grey};

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontxl};
    font-weight: 300;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.text};
  }
`;

const SkeletonCard = styled.div`
  aspect-ratio: 3/4;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.03) 25%,
    rgba(255,255,255,0.06) 50%,
    rgba(255,255,255,0.03) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const defaultFilters = {
  category: 'all',
  gender: 'all',
  sizes: [],
  minPrice: '',
  maxPrice: '',
  sort: 'default',
};

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'new-arrivals') {
      setFilters(f => ({ ...f, category: 'new-arrivals' }));
    }
    const cat = searchParams.get('category');
    if (cat) {
      setFilters(f => ({ ...f, category: cat }));
    }
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => setFilters(defaultFilters);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }

    if (filters.gender !== 'all') {
      if (filters.gender === 'women') {
        result = result.filter(p => p.gender === 'women' || p.gender === 'unisex');
      } else if (filters.gender === 'men') {
        result = result.filter(p => p.gender === 'men' || p.gender === 'unisex');
      }
    }

    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }

    if (filters.minPrice !== '') {
      result = result.filter(p => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice !== '') {
      result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    switch (filters.sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0)); break;
      default: break;
    }

    return result;
  }, [filters]);

  return (
    <PageTransition>
      <Wrapper>
        <Hero>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Collection
          </PageTitle>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Curated fashion for the modern individual
          </Subtitle>
        </Hero>

        <Container>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />

          <MainContent>
            <TopBar>
              <ResultCount>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </ResultCount>
            </TopBar>

            {loading ? (
              <Grid>
                {Array(6).fill(null).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </Grid>
            ) : filteredProducts.length === 0 ? (
              <EmptyMessage>
                <h3>No products found</h3>
                <p>Try adjusting your filters or browse all categories.</p>
              </EmptyMessage>
            ) : (
              <Grid>
                {filteredProducts.map((product, index) => (
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
            )}
          </MainContent>
        </Container>
      </Wrapper>
    </PageTransition>
  );
};

export default ShopPage;
