import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';

type Props = {
  drafts: PostProps[]
};

export default function Drafts({ drafts }: Props) {
  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style>
        {`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}

      </style>
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
