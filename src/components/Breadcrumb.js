import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${(props) => props.theme.fontsm};
  color: ${(props) => props.theme.grey};
  flex-wrap: wrap;
`;

const BreadLink = styled(Link)`
  color: ${(props) => props.theme.grey};
  text-decoration: none;
  text-transform: capitalize;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const Separator = styled.span`
  opacity: 0.4;
`;

const Current = styled.span`
  color: ${(props) => props.theme.text};
  text-transform: capitalize;
`;

const Breadcrumb = ({ items }) => {
  // items: [{ label, href }, ..., { label }] — last item is current page (no href)
  return (
    <Nav aria-label="breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <Separator>/</Separator>}
          {item.href ? (
            <BreadLink to={item.href}>{item.label}</BreadLink>
          ) : (
            <Current>{item.label}</Current>
          )}
        </React.Fragment>
      ))}
    </Nav>
  );
};

export default Breadcrumb;
