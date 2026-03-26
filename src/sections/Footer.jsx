import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { useLocomotiveScroll } from "react-locomotive-scroll";
import styled from "styled-components";
import ScrollTrigger from "gsap/ScrollTrigger";

const Section = styled.section`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;

  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: ${(props) => props.theme.fontxxl};
    font-weight: 300;
    letter-spacing: 0.15em;
    text-transform: uppercase;

    @media (max-width: 48em) {
      font-size: ${(props) => props.theme.fontxl};
    }
  }
`;

const FooterComponent = styled(motion.footer)`
  width: 80vw;

  @media (max-width: 48em) {
    width: 90vw;
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 2rem;
    margin-top: 4rem;
    padding: 0 1rem;
    border-top: 1px solid ${(props) => props.theme.borderStrong};
    border-bottom: 1px solid ${(props) => props.theme.borderStrong};

    @media (max-width: 48em) {
      justify-content: center;
    }
  }

  li {
    padding: 2rem;
    font-size: ${(props) => props.theme.fontlg};
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    color: ${(props) => props.theme.grey};
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
      color: ${(props) => props.theme.text};
    }

    @media (max-width: 48em) {
      padding: 1rem;
      font-size: ${(props) => props.theme.fontmd};
    }
  }
`;

const Bottom = styled.div`
  padding: 0.5rem 0;
  margin: 0 4rem;
  font-size: ${(props) => props.theme.fontmd};
  color: ${(props) => props.theme.grey};

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: underline;
  }

  @media (max-width: 64em) {
    flex-direction: column;
    justify-content: center;
    span {
      transform: none !important;
    }
  }

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontsm};
  }
`;

const BackToTop = styled(motion.div)`
  margin-top: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 1px solid #FFFFFF;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    svg {
      width: 1.2rem;
      height: 1.2rem;
      stroke: #FFFFFF;
      transition: stroke 0.3s ease;
    }

    &:hover {
      background: #FFFFFF;

      svg {
        stroke: #000000;
      }
    }
  }
`;

const OrdersLink = styled(Link)`
  color: ${(props) => props.theme.grey};
  font-size: ${(props) => props.theme.fontsm};
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const Footer = () => {
  const { scroll } = useLocomotiveScroll();

  const handleScroll = (id) => {
    if (id === "#shop") {
      const shopElem = document.querySelector("#shop");
      const triggers = ScrollTrigger.getAll();
      const shopTrigger = triggers.find((t) => t.trigger === shopElem);
      if (shopTrigger) {
        scroll.scrollTo(shopTrigger.start, {
          duration: 2000,
          easing: [0.25, 0.0, 0.35, 1.0],
        });
        return;
      }
    }
    let elem = document.querySelector(id);
    scroll.scrollTo(elem, {
      offset: "-100",
      duration: "2000",
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  };

  const handleBackToTop = () => {
    if (scroll) {
      scroll.scrollTo(0, {
        duration: 2000,
        easing: [0.25, 0.0, 0.35, 1.0],
      });
    }
  };

  return (
    <Section>
      <LogoContainer>
        <h3 data-scroll data-scroll-speed="-1">
          Noir Atelier
        </h3>
      </LogoContainer>
      <FooterComponent
        initial={{ y: "-400px" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false }}
        transition={{
          duration: 1.5,
        }}
      >
        <ul>
          <li aria-hidden="true" onClick={() => handleScroll("#home")}>
            home
          </li>
          <li aria-hidden="true" onClick={() => handleScroll("#shop")}>
            shop
          </li>
          <li>
            <Link to="/new-arrivals">new arrivals</Link>
          </li>
          <li>
            <Link to="/orders">orders</Link>
          </li>
        </ul>
        <Bottom>
          <span
            data-scroll
            data-scroll-speed="2"
            data-scroll-direction="horizontal"
          >
            &copy; 2025. NOIR ATELIER. All Rights Reserved.
          </span>
          <span data-scroll data-scroll-speed="-2" data-scroll-direction="horizontal">Crafted for the discerning.</span>
        </Bottom>
      </FooterComponent>
      <BackToTop
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={handleBackToTop} aria-label="Back to top">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </BackToTop>
      <OrdersLink to="/orders">Track Your Orders</OrdersLink>
    </Section>
  );
};

export default Footer;
