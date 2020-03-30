import React, {useState} from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import Layout from '../components/MyLayout'

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set('token', data.token, {expires: 1});
          Router.push('/');
        }
      });
  }
  return (
    <Layout>
      <form className="text-center text-blue-500 text-xl align-middle" onSubmit={handleSubmit}>
        <p>Login</p>
        <input className="mr-4"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="mr-4"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="btn btn-blue" type="submit" value="Submit" />
        {loginError && <p style={{color: 'red'}}>{loginError}</p>}
      </form>
    </Layout> 
  );
};

export default Login;