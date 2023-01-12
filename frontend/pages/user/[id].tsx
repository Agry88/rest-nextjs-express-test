import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/layouts/layout';
import Container from '../../components/pages-component/user/[id]';

type UserProp = {
  id: number,
  name: string,
  email: string,
};

export default function UserProfile({ id, name, email } :UserProp) {
  return (
    <Layout>
      <Container>
        <h2>{`name is ${name} id is ${id}`}</h2>
        <small>
          By
          {email}
        </small>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/api/user/${context.params.id}`);
  const data: UserProp = await res.json();
  return { props: { ...data } };
};
