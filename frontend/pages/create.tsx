import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Draft() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [catergoryId, setCatergoryId] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        title, content, authorEmail, catergoryId,
      };
      await fetch('http://localhost:3001/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form
          onSubmit={submitData}
        >
          <h1>Create Draft</h1>
          <input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Author (email address)"
            type="text"
            value={authorEmail}
          />
          <input
            onChange={(e) => setCatergoryId(e.target.value)}
            placeholder="catergoryId"
            type="text"
            value={catergoryId}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input
            disabled={!content || !title || !authorEmail || !catergoryId}
            type="submit"
            value="Create"
          />
          <Link className="href" href="/">
            or Cancel
          </Link>
        </form>
      </div>
      <style>
        {`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}

      </style>
    </Layout>
  );
}
