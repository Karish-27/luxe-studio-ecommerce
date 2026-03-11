import React from 'react';
import styled from 'styled-components';

const Sidebar = styled.aside`
  width: 240px;
  flex-shrink: 0;

  @media (max-width: 64em) {
    width: 100%;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const FilterTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${(props) => props.theme.grey};
  margin-bottom: 1rem;
`;

const GenderPills = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const GenderPill = styled.button`
  background: ${(props) => props.active ? '#FFFFFF' : 'transparent'};
  color: ${(props) => props.active ? '#000000' : '#999999'};
  border: 1px solid ${(props) => props.active ? '#FFFFFF' : '#333333'};
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsm};
  font-family: 'Inter', sans-serif;
  text-transform: capitalize;
  transition: all 0.3s;

  &:hover {
    border-color: ${(props) => props.active ? '#FFFFFF' : '#666666'};
    color: ${(props) => props.active ? '#000000' : '#FFFFFF'};
  }
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  padding: 0.4rem 0;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.active ? props.theme.text : props.theme.grey};
  cursor: pointer;
  transition: color 0.2s, padding-left 0.2s;
  text-transform: capitalize;
  font-weight: ${(props) => props.active ? '600' : '400'};
  border-left: 2px solid ${(props) => props.active ? props.theme.text : 'transparent'};
  padding-left: ${(props) => props.active ? '0.75rem' : '0'};

  &:hover {
    color: ${(props) => props.theme.text};
    padding-left: 0.75rem;
    border-left-color: rgba(255,255,255,0.4);
  }
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
`;

const SizeBtn = styled.button`
  background: ${(props) => props.active ? props.theme.text : 'transparent'};
  color: ${(props) => props.active ? props.theme.body : props.theme.grey};
  border: 1px solid ${(props) => props.active ? props.theme.text : 'rgba(255,255,255,0.2)'};
  padding: 0.4rem;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontxs};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.2);
    color: ${(props) => props.theme.text};
    padding: 0.4rem 0.6rem;
    font-size: ${(props) => props.theme.fontsm};
    font-family: 'Inter', sans-serif;
    width: 100%;
    outline: none;

    &:focus { border-color: rgba(255,255,255,0.5); }
    &::placeholder { color: rgba(255,255,255,0.3); }
  }

  span {
    color: ${(props) => props.theme.grey};
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const SortSelect = styled.select`
  width: 100%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.2);
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

  &:focus { border-color: rgba(255,255,255,0.5); }
`;

const ResetBtn = styled.button`
  width: 100%;
  padding: 0.625rem;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.2);
  color: ${(props) => props.theme.grey};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsm};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    border-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
  }
`;

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'footwear', label: 'Footwear' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

const GENDERS = [
  { value: 'all', label: 'All' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
];

const FilterSidebar = ({ filters, onFilterChange, onReset }) => {
  return (
    <Sidebar>
      <FilterGroup>
        <FilterTitle>Shop For</FilterTitle>
        <GenderPills>
          {GENDERS.map((g) => (
            <GenderPill
              key={g.value}
              active={filters.gender === g.value}
              onClick={() => onFilterChange('gender', g.value)}
            >
              {g.label}
            </GenderPill>
          ))}
        </GenderPills>
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Sort By</FilterTitle>
        <SortSelect
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
        >
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </SortSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Category</FilterTitle>
        <CategoryList>
          {CATEGORIES.map((cat) => (
            <CategoryItem
              key={cat.value}
              active={filters.category === cat.value}
              onClick={() => onFilterChange('category', cat.value)}
            >
              {cat.label}
            </CategoryItem>
          ))}
        </CategoryList>
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Size</FilterTitle>
        <SizeGrid>
          {SIZES.map((size) => (
            <SizeBtn
              key={size}
              active={filters.sizes.includes(size)}
              onClick={() => {
                const newSizes = filters.sizes.includes(size)
                  ? filters.sizes.filter((s) => s !== size)
                  : [...filters.sizes, size];
                onFilterChange('sizes', newSizes);
              }}
            >
              {size}
            </SizeBtn>
          ))}
        </SizeGrid>
      </FilterGroup>

      <FilterGroup>
        <FilterTitle>Price Range</FilterTitle>
        <PriceRange>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
          />
          <span>&ndash;</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          />
        </PriceRange>
      </FilterGroup>

      <ResetBtn onClick={onReset}>Clear All Filters</ResetBtn>
    </Sidebar>
  );
};

export default FilterSidebar;
