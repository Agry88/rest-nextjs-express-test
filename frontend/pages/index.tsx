import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/layouts/layout';
import UserItem from '../components/shared-component/user/user-item';
import UserItemContainer from '../components/pages-component/user';

type User = {
  id: number,
  name: string,
  email: string,
};

type Prop = {
  users: User[]
};

export default function UserPage({ users }: Prop) {
  return (
    <Layout>
      <div className="page">
        <h1>User List</h1>
        <main>
          {users.map((user) => (
            <UserItemContainer key={user.id} className="post">
              <UserItem user={user} />
            </UserItemContainer>
          ))}
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/user');
  const users = await res.json();
  return {
    props: { users },
  };
};
