import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
};

const PageTransition = ({ children }) => {
  return (
    <Wrapper variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </Wrapper>
  );
};

export default PageTransition;
