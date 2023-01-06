import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean =
    pathname => router.pathname === pathname

  return (
    <nav>

      <div className="left">
        <Link legacyBehavior href="/">
          <a className="bold" data-active={isActive('/')}>
            Blog
          </a>
        </Link>
        <Link legacyBehavior href="/drafts">
          <a data-active={isActive('/drafts')}>Drafts</a>
        </Link>
        <Link legacyBehavior href="/user">
          <a data-active={isActive('/user')}>User</a>
        </Link>
        <Link legacyBehavior href="/category">
          <a data-active={isActive('/category')}>Category</a>
        </Link>
      </div>

      <div className="right">
        <Link legacyBehavior href="/signup">
          <a data-active={isActive('/signup')}>Signup</a>
        </Link>
        <Link legacyBehavior href="/create">
          <a data-active={isActive('/create')}>+ Create draft</a>
        </Link>
      </div>

      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </nav>
  )
}

export default Header
