import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function CustomLink(
  { style, href, children }:
  { style?: Object, href: string, children: React.ReactNode },
) {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;
  return (
    <Link
      style={{
        textDecoration: 'none',
        color: isActive(href) ? 'gray' : '#000',
        display: 'inline-block',
        marginLeft: '1rem',
        fontWeight: isActive(href) ? 'bold' : 'normal',
        ...(style || {}),
      }}
      href={href}
    >
      {children}
    </Link>
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
      <style>
        {`

        .right a {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}

      </style>

      <div className="left">
        <CustomLink href="/">Home</CustomLink>
        <CustomLink href="/drafts">Drafts</CustomLink>
        <CustomLink href="/user">User</CustomLink>
        <CustomLink href="/category">Category</CustomLink>
      </div>

      <div
        style={{
          marginLeft: 'auto',
        }}
      >
        <CustomLink href="/signup">SignUp</CustomLink>
        <CustomLink href="/create">+ Create draft</CustomLink>
      </div>

    </nav>
  );
}
