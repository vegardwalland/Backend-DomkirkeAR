import Layout from '../components/MyLayout'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '../lib/hooks';

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useUser();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace('/');
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      username: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log("result = " + res);
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>
      <h2>Sign in</h2>
      <form className="text-center text-blue-500 text-xl align-middle" onSubmit={onSubmit}>
      {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
      <label htmlFor="email">
        <input className="mr-4"
          id="email"
          type="email"
          name="email"
          placeholder="Email address"
        />
      </label>
      <label htmlFor="password">
        <input className="mr-4"
          id="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </label>
        <button className="btn btn-blue" type="submit"> Sign in</button>
        <Link href="/forgetpassword">
          <a>Forget password</a>
        </Link>
      </form>
    </Layout> 
  );
};

export default LoginPage;