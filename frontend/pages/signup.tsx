import React, { useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layouts/layout';
import TextInput from '../components/shared-component/textinput/textinput1';
import SubmitButton from '../components/shared-component/button/background-button';
import BackButton from '../components/shared-component/button/back-button';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, email };
      await fetch('http://localhost:3001/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/');
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
          <h1>Signup user</h1>
          <TextInput
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <TextInput
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            type="text"
            value={email}
          />
          <SubmitButton
            disabled={!name || !email}
            type="submit"
          >
            Signup
          </SubmitButton>
          <BackButton href="/">
            or Cancel
          </BackButton>
        </form>
      </div>
    </Layout>
  );
}
