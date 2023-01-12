import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '../header';

type Props = {
  children: ReactNode
};

const LayoutContainer = styled.div`
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
    'Segoe UI Symbol';
  background: rgba(0, 0, 0, 0.05);
  min-height: 100vh;
`;

const LayoutChildrenContainer = styled.div`
  padding: 0 2rem;
`;

export default function Layout({ children }: Props) {
  return (
    <LayoutContainer>
      <Header />
      <LayoutChildrenContainer>
        {children}
      </LayoutChildrenContainer>
    </LayoutContainer>
  );
}
