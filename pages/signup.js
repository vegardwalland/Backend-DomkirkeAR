import React, {useState} from 'react';
import cookie from 'js-cookie';
import Router from 'next/router';
import Layout from '../components/Layout'

const Signup = () => {
    const [signupError, setSignupError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/api/user/signupUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              email,
              password,
          }),
        })
        .then((r) => r.json())
        .then((data) => {
            if (data && data.error) {
              setSignupError(data.message);
            }
            if (data && data.token) {
              //set cookie
              cookie.set('token', data.token, {expires: 2});
              Router.push('/');
            }
        });
    }

  return (
    <Layout>
      <form className="text-center text-blue-500 text-xl align-middle font-bold m-4" onSubmit={handleSubmit}>
        <div className="block my-auto">
          <p className="mb-4">Sign up</p>
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-input w-2/4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
            />
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input className="form-input w-2/4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          <input className="btn btn-blue flex mr-auto ml-auto mt-4" type="submit" value="Sign up" />
          {signupError && <p style={{color: 'red'}}>{signupError}</p>}
        </div>
      </form>
    </Layout>
  );
};

export default Signup;

