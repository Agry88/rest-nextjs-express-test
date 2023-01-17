import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

type CustomLinkProps = {
  $isActive: boolean,
};

const CustomLinkStyle = styled(Link)<CustomLinkProps>`
  text-decoration: none;
  color: ${(props) => (props.$isActive ? 'gray' : '#000')};
  display: inline-block;
  margin-left: 1rem;
  font-weight: ${(props) => (props.$isActive ? 'bold' : 'normal')};
`;

function CustomLink(
  { style, href, children }:
  { style?: Object, href: string, children: React.ReactNode },
) {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;
  return (
    <CustomLinkStyle
      $isActive={isActive(href)}
      style={style}
      href={href}
    >
      {children}
    </CustomLinkStyle>
  );
}

export default function Header() {
  return (
    <nav style={{
      display: 'flex',
      padding: '2rem',
      alignItems: 'center',
    }}
    >
      <div className="left">
        <CustomLink href="/">Home</CustomLink>
      </div>

      <div
        style={{
          marginLeft: 'auto',
        }}
      >
        <CustomLink
          style={{
            border: '1px solid black',
            padding: '0.5rem 1rem',
            borderRadius: '3px',
          }}
          href="/signup"
        >
          SignUp

        </CustomLink>
      </div>

    </nav>
  );
}
