import Link from 'next/link';
import React from 'react';

export type UsertProps = {
  id: number;
  name: string;
  email: string;
};

export default function UserItem({ user }: { user: UsertProps }) {
  const userName = user.name ? user.name : 'Unknown user';
  return (
    <Link href={`/user/${user.id}`}>
      <div>
        <h2>{user.name}</h2>
        <small>
          By
          {' '}
          {userName}
        </small>
        <style>
          {`
          div {
            color: inherit;
            padding: 2rem;
          }
          `}
        </style>
      </div>
    </Link>

  );
}
