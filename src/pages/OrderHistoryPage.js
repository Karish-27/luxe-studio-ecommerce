import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PageTransition from '../components/PageTransition';
import { useOrders } from '../context/OrderContext';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  padding-top: ${(props) => props.theme.navHeight};
`;

const Container = styled.div`
  max-width: 900px;
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
  margin-bottom: 2rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxxl};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 2rem;

  p {
    color: #999999;
    font-size: ${(props) => props.theme.fontlg};
    margin-bottom: 2rem;
  }
`;

const ShopLink = styled(Link)`
  display: inline-block;
  padding: 0.875rem 3rem;
  border: 1px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  font-family: 'Inter', sans-serif;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
  }
`;

const OrderCard = styled(motion.div)`
  border: 1px solid #222222;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.02);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 48em) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const OrderMeta = styled.div`
  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontxl};
    font-weight: 300;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => props.theme.grey};
  }
`;

const OrderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.3rem 0.75rem;
  font-size: ${(props) => props.theme.fontxs};
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid;
  border-color: ${(props) => {
    switch (props.status) {
      case 'Delivered': return '#4CAF50';
      case 'Shipped': return '#2196F3';
      case 'Processing': return '#FF9800';
      default: return props.theme.text;
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'Delivered': return '#4CAF50';
      case 'Shipped': return '#2196F3';
      case 'Processing': return '#FF9800';
      default: return props.theme.text;
    }
  }};
`;

const TotalAmount = styled.span`
  font-family: 'Cormorant Garamond', serif;
  font-size: ${(props) => props.theme.fontlg};
  font-weight: 300;
`;

const ToggleBtn = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.grey};
  font-family: 'Inter', sans-serif;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid #222222;
  width: 100%;
  text-align: center;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const Details = styled(motion.div)`
  overflow: hidden;
  border-top: 1px solid #222222;
`;

const DetailsInner = styled.div`
  padding: 1.5rem;
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    font-family: 'Inter', sans-serif;
    font-size: ${(props) => props.theme.fontsm};
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: ${(props) => props.theme.grey};
    margin-bottom: 0.75rem;
  }
`;

const ItemRow = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child {
    border-bottom: none;
  }

  img {
    width: 48px;
    height: 60px;
    object-fit: cover;
    flex-shrink: 0;
  }
`;

const ItemInfo = styled.div`
  flex: 1;

  p {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => props.theme.grey};
    margin-top: 0.15rem;
  }

  span {
    font-size: ${(props) => props.theme.fontmd};
  }
`;

const InfoText = styled.p`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.greyLight};
  line-height: 1.6;
`;

// Tracking Stepper
const STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
const STATUS_MAP = { 'Confirmed': 0, 'Processing': 1, 'Shipped': 2, 'Delivered': 3 };

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;

  @media (max-width: 48em) {
    padding: 0;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
  z-index: 1;
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
  100% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
`;

const StepCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${(props) => props.completed ? '#FFFFFF' : props.active ? '#FFFFFF' : '#333333'};
  border: 2px solid ${(props) => props.completed || props.active ? '#FFFFFF' : '#333333'};
  ${(props) => props.active && `animation: ${pulse} 2s ease-in-out infinite;`}
`;

const StepLabel = styled.span`
  font-size: 0.65rem;
  color: ${(props) => props.completed || props.active ? '#FFFFFF' : '#555555'};
  margin-top: 0.4rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;

  @media (max-width: 48em) {
    font-size: 0.55rem;
  }
`;

const StepLine = styled.div`
  flex: 1;
  height: 2px;
  background: ${(props) => props.completed ? '#FFFFFF' : '#333333'};
  margin: 0 0.25rem;
  margin-bottom: 1.2rem;
`;

const TimelineEvent = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: ${(props) => props.theme.fontsm};

  span:first-child {
    color: ${(props) => props.theme.grey};
    flex-shrink: 0;
    min-width: 140px;
  }

  span:last-child {
    color: ${(props) => props.theme.greyLight};
  }
`;

const OrderHistoryPage = () => {
  const { orders } = useOrders();
  const [expanded, setExpanded] = useState(null);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const formatTimestamp = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
    });
  };

  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Order History
          </PageTitle>

          {orders.length === 0 ? (
            <EmptyState>
              <p>No orders yet</p>
              <ShopLink to="/shop">Start Shopping</ShopLink>
            </EmptyState>
          ) : (
            orders.map((order) => {
              const stepIndex = STATUS_MAP[order.status] ?? 0;
              const isExpanded = expanded === order.orderId;
              const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

              return (
                <OrderCard
                  key={order.orderId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <OrderHeader>
                    <OrderMeta>
                      <h3>{order.orderId}</h3>
                      <p>{formatDate(order.orderDate)} &middot; {itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                    </OrderMeta>
                    <OrderRight>
                      <StatusBadge status={order.status}>{order.status}</StatusBadge>
                      <TotalAmount>${order.total.toFixed(2)}</TotalAmount>
                    </OrderRight>
                  </OrderHeader>

                  <ToggleBtn onClick={() => setExpanded(isExpanded ? null : order.orderId)}>
                    {isExpanded ? 'Hide Details' : 'View Details'}
                  </ToggleBtn>

                  <AnimatePresence>
                    {isExpanded && (
                      <Details
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DetailsInner>
                          {/* Tracking Stepper */}
                          <DetailSection>
                            <h4>Order Tracking</h4>
                            <StepperContainer>
                              {STEPS.map((step, i) => (
                                <React.Fragment key={step}>
                                  <StepWrapper>
                                    <StepCircle
                                      completed={i < stepIndex}
                                      active={i === stepIndex}
                                    />
                                    <StepLabel completed={i < stepIndex} active={i === stepIndex}>
                                      {step}
                                    </StepLabel>
                                  </StepWrapper>
                                  {i < STEPS.length - 1 && (
                                    <StepLine completed={i < stepIndex} />
                                  )}
                                </React.Fragment>
                              ))}
                            </StepperContainer>
                            {order.trackingEvents.map((evt, i) => (
                              <TimelineEvent key={i}>
                                <span>{formatTimestamp(evt.timestamp)}</span>
                                <span>{evt.description}</span>
                              </TimelineEvent>
                            ))}
                          </DetailSection>

                          {/* Items */}
                          <DetailSection>
                            <h4>Items</h4>
                            {order.items.map((item) => (
                              <ItemRow key={item.id}>
                                <img src={item.image} alt={item.name} />
                                <ItemInfo>
                                  <span>{item.name}</span>
                                  <p>{item.size} &middot; {item.color} &middot; Qty: {item.quantity}</p>
                                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </ItemInfo>
                              </ItemRow>
                            ))}
                          </DetailSection>

                          {/* Shipping */}
                          <DetailSection>
                            <h4>Shipping Address</h4>
                            <InfoText>
                              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                              {order.shippingAddress.address1}<br />
                              {order.shippingAddress.address2 && <>{order.shippingAddress.address2}<br /></>}
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postal}<br />
                              {order.shippingAddress.country}
                            </InfoText>
                          </DetailSection>

                          {/* Payment */}
                          <DetailSection>
                            <h4>Payment Method</h4>
                            <InfoText>{order.paymentMethod}</InfoText>
                          </DetailSection>
                        </DetailsInner>
                      </Details>
                    )}
                  </AnimatePresence>
                </OrderCard>
              );
            })
          )}
        </Container>
      </Wrapper>
    </PageTransition>
  );
};

export default OrderHistoryPage;
