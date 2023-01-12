import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
  }
  content: string;
  published: boolean;
};

const Container = styled.div`
  background: white;
  transition: box-shadow 0.1s ease-in;
  &:hover {
    box-shadow: 1px 1px 3px #aaa;
  };
  & + & {
    margin-top: 2rem;
  }
`;

const InnerContainer = styled.div`
  color: inherit;
  padding: 2rem;
`;

const Button = styled.button`
  background: transparent;
  width: 100%;
  height: 100%;
`;

export default function PostCard({
  post: {
    id, author, title, content,
  },
} : { post: PostProps }) {
  const authorName = author ? author.name : 'Unknown author';
  return (
    <Container>
      <InnerContainer>
        <Button
          type="button"
          onClick={() => Router.push('/p/[id]', `/p/${id}`)}
        >
          <h2>{title}</h2>
          <small>
            By
            {' '}
            {authorName}
          </small>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </Button>
      </InnerContainer>
    </Container>
  );
}
