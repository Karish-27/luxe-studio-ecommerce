import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;
`;

const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background-color: #111111;
  border-left: 1px solid rgba(255,255,255,0.08);
  z-index: 101;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 100vw;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontxl};
    color: ${(props) => props.theme.text};
    font-weight: 300;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.25rem;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover { opacity: 1; }
`;

const ItemList = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);

  img {
    width: 70px;
    height: 90px;
    object-fit: cover;
    flex-shrink: 0;
  }
`;

const ItemInfo = styled.div`
  flex: 1;

  h4 {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => props.theme.text};
    margin-bottom: 0.25rem;
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
  }

  p {
    font-size: ${(props) => props.theme.fontxs};
    color: ${(props) => props.theme.grey};
    margin-bottom: 0.5rem;
  }

  span {
    font-size: ${(props) => props.theme.fontmd};
    color: ${(props) => props.theme.text};
    font-weight: 600;
  }
`;

const AddedMessage = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.08);
  margin-top: auto;

  span {
    font-size: ${(props) => props.theme.fontmd};
    color: ${(props) => props.theme.text};
  }

  strong {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 300;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const Btn = styled.button`
  width: 100%;
  padding: 0.875rem;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontsm};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
  border-radius: 2px;

  ${(props) => props.primary ? `
    background: ${props.theme.text};
    color: ${props.theme.body};
    border: 1px solid ${props.theme.text};
    &:hover { background: transparent; color: ${props.theme.text}; }
  ` : `
    background: transparent;
    color: ${props.theme.text};
    border: 1px solid rgba(255,255,255,0.3);
    &:hover { border-color: ${props.theme.text}; }
  `}
`;

const CartSidebar = () => {
  const { items, subtotal, sidebarOpen, setSidebarOpen } = useCart();
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  const handleNavigate = (path) => {
    setSidebarOpen(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          <Overlay
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
          <Sidebar
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <Header>
              <h3>Your Cart</h3>
              <CloseBtn onClick={() => setSidebarOpen(false)}>&#x2715;</CloseBtn>
            </Header>

            <AddedMessage>Item added to your cart</AddedMessage>

            <ItemList>
              {items.slice(-3).map((item) => (
                <CartItem key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <ItemInfo>
                    <h4>{item.name}</h4>
                    <p>{item.size} · {item.color}</p>
                    <p>Qty: {item.quantity}</p>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </ItemInfo>
                </CartItem>
              ))}
            </ItemList>

            <Subtotal>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </Subtotal>

            <ButtonGroup>
              <Btn primary onClick={() => handleNavigate('/checkout')}>
                Checkout
              </Btn>
              <Btn onClick={() => handleNavigate('/cart')}>
                View Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
              </Btn>
            </ButtonGroup>
          </Sidebar>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
