import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';

async function publish(id: number): Promise<void> {
  await fetch(`http://localhost:3001/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function destroy(id: number): Promise<void> {
  await fetch(`http://localhost:3001/post/${id}`, {
    method: 'DELETE',
  });
  await Router.push('/');
}

export default function Post(props: PostProps) {
  const {
    id, published, author, content,
  } = props;
  let { title } = props;
  if (!published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>
          By
          {' '}
          {author.name || 'Unknown author'}
        </p>
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
        {!published && (
        <button type="button" onClick={() => publish(id)}>
          Publish
        </button>
        )}
        <button type="button" onClick={() => destroy(id)}>
          Delete
        </button>
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
  const res = await fetch(`http://localhost:3001/api/post/post/${context.params.id}`);
  const data = await res.json();
  return { props: { ...data } };
};
