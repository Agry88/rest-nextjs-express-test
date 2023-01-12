import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Layout from '../../components/layouts/layout';
import { PostProps } from '../../components/shared-component/post/post-card';
import BackgroundButton from '../../components/shared-component/button/background-button';
import Container from '../../components/pages-component/p/[id]';

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
      <Container>
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
        <BackgroundButton
          type="button"
          onClick={() => publish(id)}
        >
          Publish
        </BackgroundButton>
        )}
        <BackgroundButton
          type="button"
          onClick={() => destroy(id)}
        >
          Delete
        </BackgroundButton>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3001/api/post/${context.params.id}`);
  const data = await res.json();
  return { props: { ...data } };
};
