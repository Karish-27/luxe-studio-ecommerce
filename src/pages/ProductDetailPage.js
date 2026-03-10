import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Breadcrumb from '../components/Breadcrumb';
import ColorSelector from '../components/ColorSelector';
import ImageGallery from '../components/ImageGallery';
import PageTransition from '../components/PageTransition';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import SizeSelector from '../components/SizeSelector';
import StarRating from '../components/StarRating';
import { useCart } from '../context/CartContext';
import { getProductById, getRelatedProducts } from '../data/products';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding-top: ${(props) => props.theme.navHeight};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 48em) {
    padding: 1rem;
  }
`;

const BreadcrumbWrapper = styled.div`
  margin-bottom: 2rem;
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-bottom: 5rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProductInfo = styled.div``;

const ProductName = styled.h1`
  font-family: 'Kaushan Script';
  font-size: ${(props) => props.theme.fontxxl};
  font-weight: 300;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Price = styled.span`
  font-size: ${(props) => props.theme.fontxl};
  font-family: 'Kaushan Script';
  font-weight: 300;
  color: ${(props) => props.theme.text};
`;

const OriginalPrice = styled.span`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.grey};
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background: #c0392b;
  color: #fff;
  padding: 0.2rem 0.5rem;
  font-size: ${(props) => props.theme.fontxs};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin: 1.5rem 0;
`;

const SectionLabel = styled.p`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.grey};
  line-height: 1.7;
  margin-bottom: 1.5rem;
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const AddToCartBtn = styled(motion.button)`
  width: 100%;
  padding: 1.1rem;
  background: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.text};
  cursor: pointer;
  font-family: 'Sirin Stencil';
  font-size: ${(props) => props.theme.fontmd};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const WishlistBtn = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.grey};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: underline;
  font-family: 'Sirin Stencil';
  transition: color 0.2s;

  &:hover { color: ${(props) => props.theme.text}; }
`;

const ErrorMsg = styled.p`
  color: #f87171;
  font-size: ${(props) => props.theme.fontsm};
  margin-bottom: 0.75rem;
`;

const SuccessMsg = styled(motion.p)`
  color: #4ade80;
  font-size: ${(props) => props.theme.fontsm};
  margin-bottom: 0.75rem;
`;

// Accordion
const AccordionSection = styled.div`
  margin-bottom: 4rem;
`;

const AccordionItem = styled.div`
  border-top: 1px solid rgba(255,255,255,0.1);

  &:last-child {
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 0;
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-family: 'Sirin Stencil';
  font-size: ${(props) => props.theme.fontmd};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: left;
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  color: ${(props) => props.theme.grey};
  font-size: ${(props) => props.theme.fontmd};
  line-height: 1.7;
`;

const AccordionBody = styled.div`
  padding-bottom: 1.25rem;

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 0.5rem;

    th, td {
      padding: 0.5rem 1rem;
      border: 1px solid rgba(255,255,255,0.1);
      font-size: ${(props) => props.theme.fontsm};
      text-align: left;
    }

    th {
      color: ${(props) => props.theme.text};
      background: rgba(255,255,255,0.03);
    }
  }
`;

const RelatedSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Kaushan Script';
  font-size: ${(props) => props.theme.fontxxl};
  font-weight: 300;
  color: ${(props) => props.theme.text};
  margin-bottom: 2rem;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 64em) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 30em) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NotFound = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #202020;
  color: #fff;

  h2 {
    font-family: 'Kaushan Script';
    font-size: 3rem;
    font-weight: 300;
  }

  a {
    color: #bebebe;
    text-decoration: underline;
  }
`;

const ACCORDION_ITEMS = [
  { id: 'description', title: 'Description & Materials', type: 'description' },
  { id: 'size-guide', title: 'Size Guide', type: 'size-guide' },
  { id: 'shipping', title: 'Shipping & Returns', type: 'shipping' },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  
  const { addToCart } = useCart();
  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('description');

  if (!product) {
    return (
      <NotFound>
        <h2>Product Not Found</h2>
        <Link to="/shop">Back to Shop</Link>
      </NotFound>
    );
  }

  const relatedProducts = getRelatedProducts(product);
  const isOnSale = product.originalPrice > product.price;
  const discountPercent = isOnSale
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    setError('');
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: product.category, href: `/shop?category=${product.category}` },
    { label: product.name },
  ];

  const renderAccordionContent = (type) => {
    switch (type) {
      case 'description':
        return (
          <AccordionBody>
            <p>{product.description}</p>
            <br />
            <p><strong style={{ color: '#fff' }}>Material:</strong> {product.material}</p>
            <br />
            <p><strong style={{ color: '#fff' }}>Category:</strong> {product.category} — {product.subcategory}</p>
          </AccordionBody>
        );
      case 'size-guide':
        return (
          <AccordionBody>
            <table>
              <thead>
                <tr><th>Size</th><th>Chest (in)</th><th>Waist (in)</th><th>Hip (in)</th></tr>
              </thead>
              <tbody>
                <tr><td>XS</td><td>32–33</td><td>24–25</td><td>34–35</td></tr>
                <tr><td>S</td><td>34–35</td><td>26–27</td><td>36–37</td></tr>
                <tr><td>M</td><td>36–37</td><td>28–29</td><td>38–39</td></tr>
                <tr><td>L</td><td>38–40</td><td>30–32</td><td>40–42</td></tr>
                <tr><td>XL</td><td>41–43</td><td>33–35</td><td>43–45</td></tr>
              </tbody>
            </table>
          </AccordionBody>
        );
      case 'shipping':
        return (
          <AccordionBody>
            <p><strong style={{ color: '#fff' }}>Standard Shipping:</strong> Free on orders over $100. Otherwise $10. Delivered in 5–7 business days.</p>
            <br />
            <p><strong style={{ color: '#fff' }}>Express Shipping:</strong> $20. Delivered in 2–3 business days.</p>
            <br />
            <p><strong style={{ color: '#fff' }}>Returns:</strong> We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition. Final sale items cannot be returned.</p>
          </AccordionBody>
        );
      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <BreadcrumbWrapper>
            <Breadcrumb items={breadcrumbItems} />
          </BreadcrumbWrapper>

          <ProductLayout>
            <ImageGallery images={product.images} alt={product.name} />

            <ProductInfo>
              <ProductName>{product.name}</ProductName>

              <RatingRow>
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="1rem" />
              </RatingRow>

              <PriceRow>
                <Price>${product.price.toFixed(2)}</Price>
                {isOnSale && (
                  <>
                    <OriginalPrice>${product.originalPrice.toFixed(2)}</OriginalPrice>
                    <DiscountBadge>-{discountPercent}%</DiscountBadge>
                  </>
                )}
              </PriceRow>

              <Description>{product.description.split('.')[0]}.</Description>

              <Divider />

              <div>
                <SectionLabel>Color</SectionLabel>
                <ColorSelector
                  colors={product.colors}
                  selected={selectedColor}
                  onChange={(c) => { setSelectedColor(c); setError(''); }}
                />
              </div>

              <Divider />

              <div>
                <SectionLabel>Size</SectionLabel>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onChange={(s) => { setSelectedSize(s); setError(''); }}
                />
              </div>

              <Divider />

              <QuantityRow>
                <SectionLabel style={{ marginBottom: 0 }}>Quantity</SectionLabel>
                <QuantitySelector
                  value={quantity}
                  min={1}
                  max={10}
                  onChange={setQuantity}
                />
              </QuantityRow>

              {error && <ErrorMsg>{error}</ErrorMsg>}

              <AnimatePresence>
                {added && (
                  <SuccessMsg
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    ✓ Added to cart!
                  </SuccessMsg>
                )}
              </AnimatePresence>

              <AddToCartBtn
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileTap={{ scale: 0.98 }}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </AddToCartBtn>

              <WishlistBtn>♡ Add to Wishlist</WishlistBtn>
            </ProductInfo>
          </ProductLayout>

          <AccordionSection>
            {ACCORDION_ITEMS.map((item) => (
              <AccordionItem key={item.id}>
                <AccordionHeader onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}>
                  <span>{item.title}</span>
                  <span>{openAccordion === item.id ? '−' : '+'}</span>
                </AccordionHeader>
                <AnimatePresence>
                  {openAccordion === item.id && (
                    <AccordionContent
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderAccordionContent(item.type)}
                    </AccordionContent>
                  )}
                </AnimatePresence>
              </AccordionItem>
            ))}
          </AccordionSection>

          {relatedProducts.length > 0 && (
            <RelatedSection>
              <SectionTitle>You May Also Like</SectionTitle>
              <RelatedGrid>
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </RelatedGrid>
            </RelatedSection>
          )}
        </Container>
      </Wrapper>
    </PageTransition>
  );
};

export default ProductDetailPage;
