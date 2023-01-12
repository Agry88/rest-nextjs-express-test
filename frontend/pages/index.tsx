import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/layouts/layout';
import Post, { PostProps } from '../components/shared-component/post/post-card';

type Props = {
  feed: PostProps[]
};

export default function Blog({ feed }: Props) {
  return (
    <Layout>
      <div>
        <h1>My Blog</h1>
        <main>
          {feed.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </main>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3001/api/post/feed');
  const feed = await res.json();
  return {
    props: { feed },
  };
};
