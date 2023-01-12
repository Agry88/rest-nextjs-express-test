import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

export type UsertProps = {
  id: number;
  name: string;
  email: string;
};

const Container = styled.div`
  color: inherit;
  padding: 2rem;
`;

export default function UserItem({ user }: { user: UsertProps }) {
  const userName = user.name ? user.name : 'Unknown user';
  return (
    <Link href={`/user/${user.id}`}>
      <Container>
        <h2>{user.name}</h2>
        <small>
          By
          {' '}
          {userName}
        </small>
      </Container>
    </Link>

  );
}
