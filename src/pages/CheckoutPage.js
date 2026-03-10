import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTransition from '../components/PageTransition';
import { useCart } from '../context/CartContext';

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
  font-family: 'Kaushan Script';
  font-size: ${(props) => props.theme.fontxxxl};
  font-weight: 300;
  margin-bottom: 2rem;

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

const FormSection = styled.div``;

const SectionBlock = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Sirin Stencil';
  font-size: ${(props) => props.theme.fontmd};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: ${(props) => props.theme.grey};
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.1);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.cols || '1fr 1fr'};
  gap: 1rem;

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  ${(props) => props.full && 'grid-column: 1 / -1;'}
`;

const Label = styled.label`
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Input = styled.input`
  background: rgba(255,255,255,0.04);
  border: 1px solid ${(props) => props.error ? '#f87171' : 'rgba(255,255,255,0.15)'};
  color: ${(props) => props.theme.text};
  padding: 0.75rem 1rem;
  font-size: ${(props) => props.theme.fontmd};
  font-family: 'Sirin Stencil';
  outline: none;
  width: 100%;
  transition: border-color 0.2s;

  &:focus {
    border-color: rgba(255,255,255,0.5);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1);
  }

  &::placeholder { color: rgba(255,255,255,0.25); }
`;

const Select = styled.select`
  background: rgba(255,255,255,0.04);
  border: 1px solid ${(props) => props.error ? '#f87171' : 'rgba(255,255,255,0.15)'};
  color: ${(props) => props.theme.text};
  padding: 0.75rem 1rem;
  font-size: ${(props) => props.theme.fontmd};
  font-family: 'Sirin Stencil';
  outline: none;
  width: 100%;
  cursor: pointer;

  option { background: #202020; }

  &:focus { border-color: rgba(255,255,255,0.5); }
`;

const FieldError = styled.span`
  font-size: ${(props) => props.theme.fontxs};
  color: #f87171;
`;

const ShippingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ShippingOption = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.selected ? props.theme.text : 'rgba(255,255,255,0.15)'};
  cursor: pointer;
  transition: border-color 0.2s;

  input[type="radio"] {
    accent-color: #fff;
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
  }

  &:hover { border-color: rgba(255,255,255,0.4); }
`;

const ShippingInfo = styled.div`
  flex: 1;

  strong {
    display: block;
    font-size: ${(props) => props.theme.fontmd};
    color: ${(props) => props.theme.text};
    margin-bottom: 0.1rem;
  }

  span {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => props.theme.grey};
  }
`;

const ShippingPrice = styled.span`
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.text};
  font-weight: 600;
`;

// Order Summary Panel
const OrderPanel = styled.div`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: calc(${(props) => props.theme.navHeight} + 2rem);

  h2 {
    font-family: 'Kaushan Script';
    font-size: ${(props) => props.theme.fontxl};
    font-weight: 300;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
`;

const OrderItem = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);

  img {
    width: 56px;
    height: 70px;
    object-fit: cover;
    flex-shrink: 0;
  }
`;

const OrderItemInfo = styled.div`
  flex: 1;

  h4 {
    font-size: ${(props) => props.theme.fontsm};
    color: ${(props) => props.theme.text};
    font-family: 'Kaushan Script';
    font-weight: 300;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: ${(props) => props.theme.fontxs};
    color: ${(props) => props.theme.grey};
  }

  span {
    font-size: ${(props) => props.theme.fontmd};
    color: ${(props) => props.theme.text};
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.large ? props.theme.text : props.theme.grey};
  font-weight: ${(props) => props.large ? '600' : '400'};
  ${(props) => props.large && `
    border-top: 1px solid rgba(255,255,255,0.1);
    margin-top: 0.5rem;
    padding-top: 1rem;
  `}
`;

const SubmitBtn = styled(motion.button)`
  width: 100%;
  padding: 1.1rem;
  background: ${(props) => props.theme.text};
  color: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.text};
  cursor: pointer;
  font-family: 'Sirin Stencil';
  font-size: ${(props) => props.theme.fontmd};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-top: 1.5rem;
  transition: all 0.3s;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme.text};
  }
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.grey};
  font-size: ${(props) => props.theme.fontsm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: color 0.2s;

  &:hover { color: ${(props) => props.theme.text}; }
`;

const EmptyRedirect = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;

  h2 {
    font-family: 'Kaushan Script';
    font-size: ${(props) => props.theme.fontxxl};
    font-weight: 300;
  }

  p { color: ${(props) => props.theme.grey}; }
`;

const COUNTRIES = ['United States', 'United Kingdom', 'Canada', 'Australia', 'France', 'Germany', 'Japan', 'Other'];

const CheckoutPage = () => {
  const { items, subtotal, discountAmount, discountedSubtotal, shipping, tax, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [form, setForm] = useState({
    email: '', phone: '',
    firstName: '', lastName: '',
    address1: '', address2: '',
    city: '', state: '', postal: '', country: 'United States',
    cardNumber: '', cardExpiry: '', cardCvv: '', cardName: '',
  });
  const [errors, setErrors] = useState({});

  if (items.length === 0) {
    return (
      <PageTransition>
        <Wrapper>
          <Container>
            <EmptyRedirect>
              <h2>No items to checkout</h2>
              <p>Add some products to your cart first.</p>
              <BackLink to="/shop">Browse Shop</BackLink>
            </EmptyRedirect>
          </Container>
        </Wrapper>
      </PageTransition>
    );
  }

  const expressShippingCost = 20;
  const finalShipping = shippingMethod === 'express' ? expressShippingCost : shipping;
  const finalTotal = discountedSubtotal + finalShipping + tax;

  const formatCardNumber = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) return `${digits.slice(0,2)}/${digits.slice(2)}`;
    return digits;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cardNumber') value = formatCardNumber(value);
    if (name === 'cardExpiry') value = formatExpiry(value);
    if (name === 'cardCvv') value = value.replace(/\D/g, '').slice(0, 4);
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.phone) newErrors.phone = 'Phone is required';
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.address1) newErrors.address1 = 'Address is required';
    if (!form.city) newErrors.city = 'City is required';
    if (!form.state) newErrors.state = 'State is required';
    if (!form.postal) newErrors.postal = 'Postal code is required';
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16)
      newErrors.cardNumber = 'Enter a valid 16-digit card number';
    if (!form.cardExpiry || !form.cardExpiry.includes('/') || form.cardExpiry.length < 5)
      newErrors.cardExpiry = 'Enter a valid expiry (MM/YY)';
    if (!form.cardCvv || form.cardCvv.length < 3) newErrors.cardCvv = 'CVV must be 3-4 digits';
    if (!form.cardName) newErrors.cardName = 'Name on card is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstError = document.querySelector('[data-error]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    clearCart();
    navigate('/order-confirmation', { state: { email: form.email, total: finalTotal } });
  };

  return (
    <PageTransition>
      <Wrapper>
        <Container>
          <BackLink to="/cart">← Back to Cart</BackLink>
          <PageTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            Checkout
          </PageTitle>

          <Layout>
            <FormSection>
              <form onSubmit={handleSubmit} noValidate>
                {/* Contact */}
                <SectionBlock>
                  <SectionTitle>Contact Information</SectionTitle>
                  <FormGrid>
                    <FormField data-error={errors.email || undefined}>
                      <Label>Email *</Label>
                      <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" error={!!errors.email} />
                      {errors.email && <FieldError>{errors.email}</FieldError>}
                    </FormField>
                    <FormField data-error={errors.phone || undefined}>
                      <Label>Phone *</Label>
                      <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" error={!!errors.phone} />
                      {errors.phone && <FieldError>{errors.phone}</FieldError>}
                    </FormField>
                  </FormGrid>
                </SectionBlock>

                {/* Shipping Address */}
                <SectionBlock>
                  <SectionTitle>Shipping Address</SectionTitle>
                  <FormGrid>
                    <FormField data-error={errors.firstName || undefined}>
                      <Label>First Name *</Label>
                      <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Jane" error={!!errors.firstName} />
                      {errors.firstName && <FieldError>{errors.firstName}</FieldError>}
                    </FormField>
                    <FormField data-error={errors.lastName || undefined}>
                      <Label>Last Name *</Label>
                      <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Doe" error={!!errors.lastName} />
                      {errors.lastName && <FieldError>{errors.lastName}</FieldError>}
                    </FormField>
                    <FormField full data-error={errors.address1 || undefined}>
                      <Label>Address Line 1 *</Label>
                      <Input name="address1" value={form.address1} onChange={handleChange} placeholder="123 Main Street" error={!!errors.address1} />
                      {errors.address1 && <FieldError>{errors.address1}</FieldError>}
                    </FormField>
                    <FormField full>
                      <Label>Address Line 2</Label>
                      <Input name="address2" value={form.address2} onChange={handleChange} placeholder="Apt, suite, unit, etc." />
                    </FormField>
                    <FormField data-error={errors.city || undefined}>
                      <Label>City *</Label>
                      <Input name="city" value={form.city} onChange={handleChange} placeholder="New York" error={!!errors.city} />
                      {errors.city && <FieldError>{errors.city}</FieldError>}
                    </FormField>
                    <FormField data-error={errors.state || undefined}>
                      <Label>State / Province *</Label>
                      <Input name="state" value={form.state} onChange={handleChange} placeholder="NY" error={!!errors.state} />
                      {errors.state && <FieldError>{errors.state}</FieldError>}
                    </FormField>
                    <FormField data-error={errors.postal || undefined}>
                      <Label>Postal Code *</Label>
                      <Input name="postal" value={form.postal} onChange={handleChange} placeholder="10001" error={!!errors.postal} />
                      {errors.postal && <FieldError>{errors.postal}</FieldError>}
                    </FormField>
                    <FormField>
                      <Label>Country</Label>
                      <Select name="country" value={form.country} onChange={handleChange}>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </Select>
                    </FormField>
                  </FormGrid>
                </SectionBlock>

                {/* Shipping Method */}
                <SectionBlock>
                  <SectionTitle>Shipping Method</SectionTitle>
                  <ShippingOptions>
                    <ShippingOption selected={shippingMethod === 'standard'}>
                      <input type="radio" name="shipping" value="standard" checked={shippingMethod === 'standard'} onChange={() => setShippingMethod('standard')} />
                      <ShippingInfo>
                        <strong>Standard Shipping</strong>
                        <span>5–7 business days</span>
                      </ShippingInfo>
                      <ShippingPrice>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</ShippingPrice>
                    </ShippingOption>
                    <ShippingOption selected={shippingMethod === 'express'}>
                      <input type="radio" name="shipping" value="express" checked={shippingMethod === 'express'} onChange={() => setShippingMethod('express')} />
                      <ShippingInfo>
                        <strong>Express Shipping</strong>
                        <span>2–3 business days</span>
                      </ShippingInfo>
                      <ShippingPrice>$20.00</ShippingPrice>
                    </ShippingOption>
                  </ShippingOptions>
                </SectionBlock>

                {/* Payment */}
                <SectionBlock>
                  <SectionTitle>Payment Information</SectionTitle>
                  <FormGrid cols="1fr">
                    <FormField data-error={errors.cardNumber || undefined}>
                      <Label>Card Number *</Label>
                      <Input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" maxLength={19} error={!!errors.cardNumber} />
                      {errors.cardNumber && <FieldError>{errors.cardNumber}</FieldError>}
                    </FormField>
                  </FormGrid>
                  <FormGrid style={{ marginTop: '1rem' }}>
                    <FormField data-error={errors.cardExpiry || undefined}>
                      <Label>Expiry Date *</Label>
                      <Input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM/YY" maxLength={5} error={!!errors.cardExpiry} />
                      {errors.cardExpiry && <FieldError>{errors.cardExpiry}</FieldError>}
                    </FormField>
                    <FormField data-error={errors.cardCvv || undefined}>
                      <Label>CVV *</Label>
                      <Input name="cardCvv" value={form.cardCvv} onChange={handleChange} placeholder="123" maxLength={4} error={!!errors.cardCvv} />
                      {errors.cardCvv && <FieldError>{errors.cardCvv}</FieldError>}
                    </FormField>
                    <FormField full data-error={errors.cardName || undefined}>
                      <Label>Name on Card *</Label>
                      <Input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Jane Doe" error={!!errors.cardName} />
                      {errors.cardName && <FieldError>{errors.cardName}</FieldError>}
                    </FormField>
                  </FormGrid>
                </SectionBlock>

                <SubmitBtn type="submit" whileTap={{ scale: 0.98 }}>
                  Place Order — ${finalTotal.toFixed(2)}
                </SubmitBtn>
              </form>
            </FormSection>

            <OrderPanel>
              <h2>Order Summary</h2>
              {items.map(item => (
                <OrderItem key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <OrderItemInfo>
                    <h4>{item.name}</h4>
                    <p>{item.size} · {item.color}</p>
                    <p>Qty: {item.quantity}</p>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </OrderItemInfo>
                </OrderItem>
              ))}

              <SummaryRow>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </SummaryRow>
              {discountAmount > 0 && (
                <SummaryRow>
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </SummaryRow>
              )}
              <SummaryRow>
                <span>Shipping</span>
                <span>{finalShipping === 0 ? 'Free' : `$${finalShipping.toFixed(2)}`}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </SummaryRow>
              <SummaryRow large>
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </SummaryRow>
            </OrderPanel>
          </Layout>
        </Container>
      </Wrapper>
    </PageTransition>
  );
};

export default CheckoutPage;
