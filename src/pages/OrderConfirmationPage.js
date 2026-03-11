import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTransition from '../components/PageTransition';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.navHeight} 2rem 4rem;
`;

const Card = styled(motion.div)`
  max-width: 600px;
  width: 100%;
  text-align: center;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.02);
`;

const CheckCircle = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2rem;
  color: ${(props) => props.theme.text};
`;

const Heading = styled(motion.h1)`
  font-family: 'Cormorant Garamond', serif;
  font-size: ${(props) => props.theme.fontxxl};
  font-weight: 300;
  margin-bottom: 1rem;
  line-height: 1.2;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;

const OrderNum = styled(motion.p)`
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.grey};
  margin-bottom: 0.5rem;

  span {
    color: ${(props) => props.theme.text};
    font-weight: 600;
  }
`;

const Message = styled(motion.p)`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.grey};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const TotalDisplay = styled(motion.div)`
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);

  p {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => props.theme.grey};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }

  strong {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontxl};
    font-weight: 300;
    color: ${(props) => props.theme.text};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin: 1.5rem 0;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const PrimaryBtn = styled(Link)`
  display: inline-block;
  padding: 0.875rem 2.5rem;
  background: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.text};
  font-family: 'Inter', sans-serif;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: all 0.3s;
  text-decoration: none;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme.text};
  }
`;

const SecondaryBtn = styled(Link)`
  display: inline-block;
  padding: 0.875rem 2.5rem;
  border: 1px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  font-family: 'Inter', sans-serif;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: all 0.3s;
  text-decoration: none;

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`;

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, total, orderId } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  return (
    <PageTransition>
      <Wrapper>
        <Card
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CheckCircle
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            &#10003;
          </CheckCircle>

          <Heading
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Thank You for Your Order!
          </Heading>

          <OrderNum
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            Order Number: <span>{orderId || 'ORD-000000'}</span>
          </OrderNum>

          <Divider />

          <Message
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            {email
              ? `We've sent a confirmation to ${email}.`
              : 'Your order has been placed successfully.'}{' '}
            We'll notify you when your order ships.
          </Message>

          {total && (
            <TotalDisplay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <p>Order Total</p>
              <strong>${total.toFixed(2)}</strong>
            </TotalDisplay>
          )}

          <ButtonGroup
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <PrimaryBtn to="/shop">Continue Shopping</PrimaryBtn>
            <SecondaryBtn to="/orders">View Order Details</SecondaryBtn>
          </ButtonGroup>
        </Card>
      </Wrapper>
    </PageTransition>
  );
};

export default OrderConfirmationPage;
