import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';

type UserProp = {
  id: number,
  name: string,
  email: string,
};

export default function UserProfile({ id, name, email } :UserProp) {
  return (
    <Layout>
      <div>
        <h2>{`name is ${name} id is ${id}`}</h2>
        <small>
          By
          {email}
        </small>
      </div>
      <style>
        {`
        .page {
          background: white;
          padding: 2rem;
        }
        .actions {
          margin-top: 2rem;
        }
        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }
        button + button {
          margin-left: 1rem;
        }
      `}
      </style>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/api/user/${context.params.id}`);
  const data: UserProp = await res.json();
  return { props: { ...data } };
};
