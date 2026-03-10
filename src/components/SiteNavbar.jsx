import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CartIcon from './CartIcon';

const NavBar = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${(props) => props.theme.navHeight};
  background-color: #111111;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;

  @media (max-width: 48em) {
    padding: 0 1.5rem;
  }
`;

const Brand = styled(Link)`
  font-family: 'Kaushan Script';
  font-size: ${(props) => props.theme.fontlg};
  color: ${(props) => props.theme.text};
  text-decoration: none;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 2.5rem;

  @media (max-width: 64em) {
    gap: 1.5rem;
  }

  @media (max-width: 48em) {
    display: ${(props) => (props.open ? 'flex' : 'none')};
    flex-direction: column;
    position: fixed;
    top: ${(props) => props.theme.navHeight};
    left: 0;
    right: 0;
    background: #111111;
    padding: 2rem;
    gap: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    z-index: 49;
  }
`;

const NavItem = styled(motion.li)`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontsm};
  letter-spacing: 0.1em;
`;

const NavLink = styled(Link)`
  color: ${(props) =>
    props.active ? props.theme.text : props.theme.grey};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const HamburgerBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  flex-direction: column;
  gap: 5px;

  @media (max-width: 48em) {
    display: flex;
  }

  span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${(props) => props.theme.text};
    transition: all 0.3s;
  }
`;

const SiteNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'New Arrivals', to: '/shop?filter=new-arrivals' },
  ];

  return (
    <NavBar
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Brand to="/">Luxe Studio</Brand>

      <NavLinks open={menuOpen}>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <NavLink
              to={item.to}
              active={
                item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.to.split('?')[0])
                  ? 1
                  : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </NavLinks>

      <RightGroup>
        <CartIcon />
        <HamburgerBtn onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span />
          <span />
          <span />
        </HamburgerBtn>
      </RightGroup>
    </NavBar>
  );
};

export default SiteNavbar;
