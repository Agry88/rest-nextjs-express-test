import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
  }
  content: string;
  published: boolean;
};

export default function PostItem({
  post: {
    id, author, title, content,
  },
} : { post: PostProps }) {
  const authorName = author ? author.name : 'Unknown author';
  return (
    <div style={{
      color: 'inherit',
      padding: '2rem',
    }}
    >
      <button
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
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
      </button>
    </div>
  );
}
