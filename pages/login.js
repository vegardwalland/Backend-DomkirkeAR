import React, {useState} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import cookie from 'js-cookie';
import Layout from '../components/MyLayout';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // call api
        fetch('/api/user/auth', {
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
                // set cookie
                cookie.set('token', data.token, {expires: 1});
                Router.push('/');
            }
        });
    };

    return (
        <Layout>
            <form className="text-center text-blue-500 text-xl align-middle font-bold m-4" onSubmit={handleSubmit}>
                <div className="block my-auto">
                    <p className="mb-4">Log In</p>
                    <label className="form-label" htmlFor="email">
                        Email
                    </label>
                    <input className="form-input w-2/4"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                    <input className="form-input w-2/4"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input className="btn btn-blue flex mr-auto ml-auto mt-4" type="submit" value="Log In" />
                    {loginError && <p style={{color: 'red'}}>{loginError}</p>}

                    <Link href="/forgetpassword/index">
                        <a className="flex mr-auto ml-auto mb-8 w-40 hover:text-gray-900">Forgotten password?</a>
                    </Link>
                </div>
            </form>
        </Layout>
    );
};
    export default Login;
