import React, { useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layouts/layout';
import TextInput from '../components/shared-component/textinput/textinput1';
import TextArea from '../components/shared-component/textinput/textarea1';
import SubmitButton from '../components/shared-component/button/background-button';
import BackButton from '../components/shared-component/button/back-button';

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
          <TextInput
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <TextInput
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Author (email address)"
            type="text"
            value={authorEmail}
          />
          <TextInput
            onChange={(e) => setCatergoryId(e.target.value)}
            placeholder="catergoryId"
            type="text"
            value={catergoryId}
          />
          <TextArea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <SubmitButton
            disabled={!content || !title || !authorEmail || !catergoryId}
            type="submit"
          >
            Create
          </SubmitButton>
          <BackButton href="/">
            or Cancel
          </BackButton>
        </form>
      </div>
    </Layout>
  );
}
