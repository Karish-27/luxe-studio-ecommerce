import { motion } from 'framer-motion';
import styled from 'styled-components';

const Wrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`;

const PageTransition = ({ children }) => {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } }}
    >
      {children}
    </Wrapper>
  );
};

export default PageTransition;
