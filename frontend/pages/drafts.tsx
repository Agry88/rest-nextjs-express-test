import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/layouts/layout';
import Post, { PostProps } from '../components/shared-component/post/post-card';

type Props = {
  drafts: PostProps[]
};

export default function Drafts({ drafts }: Props) {
  return (
    <Layout>
      <div>
        <h1>Drafts</h1>
        <main>
          {drafts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/post/drafts');
  const drafts = await res.json();
  return {
    props: { drafts },
  };
};
