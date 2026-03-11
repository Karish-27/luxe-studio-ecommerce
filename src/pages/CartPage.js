import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import PageTransition from '../components/PageTransition';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding-top: ${(props) => props.theme.navHeight};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;

  @media (max-width: 48em) {
    padding: 2rem 1rem;
  }
`;

const PageTitle = styled(motion.h1)`
  font-family: 'Cormorant Garamond', serif;
  font-size: ${(props) => props.theme.fontxxxl};
  font-weight: 300;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.text};

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 3rem;

  @media (max-width: 64em) {
    grid-template-columns: 1fr;
  }
`;

const ItemsSection = styled.div``;

const CartItemCard = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);

  @media (max-width: 48em) {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 130px;
  object-fit: cover;

  @media (max-width: 48em) {
    width: 80px;
    height: 100px;
  }
`;

const ItemDetails = styled.div`
  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
    margin-bottom: 0.5rem;
    color: ${(props) => props.theme.text};
  }
  p {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => props.theme.grey};
    margin-bottom: 0.25rem;
  }
  .price {
    font-size: ${(props) => props.theme.fontmd};
    color: ${(props) => props.theme.text};
    font-weight: 600;
    margin-top: 0.5rem;
  }
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: 48em) {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const QtyControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.2);

  button {
    background: none;
    border: none;
    color: ${(props) => props.theme.text};
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover { background: rgba(255,255,255,0.1); }
  }

  span {
    width: 2.5rem;
    text-align: center;
    font-size: ${(props) => props.theme.fontmd};
    color: ${(props) => props.theme.text};
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.grey};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s;
  padding: 0;

  &:hover { color: ${(props) => props.theme.text}; }
`;

const LineTotal = styled.span`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.text};
  font-weight: 600;
  min-width: 5rem;
  text-align: right;
`;

const OrderSummary = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: calc(${(props) => props.theme.navHeight} + 2rem);

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontxl};
    font-weight: 300;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    color: ${(props) => props.theme.text};
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.size === 'large' ? props.theme.text : props.theme.grey};
  font-weight: ${(props) => props.size === 'large' ? '600' : '400'};

  ${(props) => props.size === 'large' && `
    border-top: 1px solid rgba(255,255,255,0.1);
    margin-top: 0.5rem;
    padding-top: 1rem;
    font-size: 1.1em;
  `}
`;

const PromoSection = styled.div`
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const PromoLabel = styled.p`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const PromoInput = styled.div`
  display: flex;
  gap: 0.5rem;

  input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.2);
    color: ${(props) => props.theme.text};
    padding: 0.5rem 0.75rem;
    font-size: ${(props) => props.theme.fontsm};
    font-family: 'Inter', sans-serif;
    outline: none;

    &:focus { border-color: rgba(255,255,255,0.5); }
    &::placeholder { color: rgba(255,255,255,0.3); }
  }

  button {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    color: ${(props) => props.theme.text};
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontsm};
    font-family: 'Inter', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.2s;

    &:hover { background: rgba(255,255,255,0.15); }
  }
`;

const PromoMessage = styled.p`
  font-size: ${(props) => props.theme.fontxs};
  color: ${(props) => props.success ? '#FFFFFF' : '#FF4444'};
  margin-top: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const PrimaryBtn = styled.button`
  width: 100%;
  padding: 1rem;
  background: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.text};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsm};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme.text};
  }
`;

const SecondaryBtn = styled(Link)`
  display: block;
  width: 100%;
  padding: 0.875rem;
  background: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid rgba(255,255,255,0.3);
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsm};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  text-align: center;

  &:hover { border-color: ${(props) => props.theme.text}; }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2rem;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontxxl};
    font-weight: 300;
    margin-bottom: 1rem;
    color: ${(props) => props.theme.text};
  }

  p {
    color: ${(props) => props.theme.grey};
    margin-bottom: 2rem;
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const ShopLink = styled(Link)`
  display: inline-block;
  padding: 0.875rem 2.5rem;
  border: 1px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: ${(props) => props.theme.fontsm};
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`;

const CartPage = () => {
  const { items, subtotal, discountAmount, shipping, tax, total, promoCode, promoCodeError, removeFromCart, updateQuantity, applyPromo, removePromo } = useCart();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = () => {
    if (promoCode) {
      removePromo();
      setPromoInput('');
    } else {
      applyPromo(promoInput);
    }
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <Wrapper>
          <Container>
            <EmptyState>
              <h2>Your cart is empty</h2>
              <p>Discover our latest collections and find something you love.</p>
              <ShopLink to="/shop">Start Shopping</ShopLink>
            </EmptyState>
          </Container>
        </Wrapper>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Shopping Cart
          </PageTitle>

          <Layout>
            <ItemsSection>
              {items.map((item) => (
                <CartItemCard key={item.id}>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemDetails>
                    <h3>{item.name}</h3>
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                    <p className="price">${item.price.toFixed(2)}</p>
                  </ItemDetails>
                  <ItemActions>
                    <QtyControl>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>&minus;</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </QtyControl>
                    <LineTotal>${(item.price * item.quantity).toFixed(2)}</LineTotal>
                    <RemoveBtn onClick={() => removeFromCart(item.id)}>Remove</RemoveBtn>
                  </ItemActions>
                </CartItemCard>
              ))}
            </ItemsSection>

            <OrderSummary>
              <h2>Order Summary</h2>

              <SummaryRow>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </SummaryRow>

              {discountAmount > 0 && (
                <SummaryRow>
                  <span>Discount ({promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </SummaryRow>
              )}

              <SummaryRow>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </SummaryRow>

              <SummaryRow>
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </SummaryRow>

              <SummaryRow size="large">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </SummaryRow>

              <PromoSection>
                <PromoLabel>Promo Code</PromoLabel>
                {promoCode ? (
                  <div>
                    <PromoMessage success>
                      &#x2713; Code &quot;{promoCode}&quot; applied!
                    </PromoMessage>
                    <PromoInput>
                      <button onClick={handleApplyPromo} style={{width: '100%'}}>Remove Code</button>
                    </PromoInput>
                  </div>
                ) : (
                  <>
                    <PromoInput>
                      <input
                        type="text"
                        placeholder="Enter promo code"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      />
                      <button onClick={handleApplyPromo}>Apply</button>
                    </PromoInput>
                    {promoCodeError && <PromoMessage>{promoCodeError}</PromoMessage>}
                    <PromoMessage success={false} style={{color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem'}}>
                      Try: NOIR10, ATELIER15, WELCOME20
                    </PromoMessage>
                  </>
                )}
              </PromoSection>

              <ActionButtons>
                <PrimaryBtn onClick={() => navigate('/checkout')}>
                  Proceed to Checkout
                </PrimaryBtn>
                <SecondaryBtn to="/shop">
                  Continue Shopping
                </SecondaryBtn>
              </ActionButtons>
            </OrderSummary>
          </Layout>
        </Container>
      </Wrapper>
    </PageTransition>
  );
};

export default CartPage;
