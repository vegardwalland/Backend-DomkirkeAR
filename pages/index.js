import fetch from '../libs/fetch';
import useSwr from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';
import Layout from '../components/Layout';
import { useState } from 'react';
import CookieMessage from '../components/CookieMessage';

function Home() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [changePasswordMessage, setChangePasswordMessage] = useState("");
    const [changePassword, setChangePassword] = useState("");

    const {data, revalidate} = useSwr(`/api/user/me`, fetch);

    if (!data) return <h1>Loading...</h1>;
    let loggedIn = false;
    if (data.email) {
        loggedIn = true;
    }

    function handleSubmitPasswordChange(e) {
        e.preventDefault();

        fetch('/api/user/password/password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({
                userEmail: data.email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            })
        }).then(res => {
            if (res.ok) {
                setNewPassword('');
                setOldPassword('');
            }
            setChangePasswordMessage(res.message);
        });
    }

    return (
        <Layout>
            <body className="flex flex-col">
            <div className="block text-center text-xl font-bold">
                <main>
                    <h1 className="text-3xl my-8">Gamle Stavanger AR portal</h1>

                    {loggedIn && (
                        <div>
                            <h2 className="my-16 text-gray-700">Welcome, {data.email}</h2>
                            <button className="btn btn-blue"
                                onClick={() => {
                                    cookie.remove('token');
                                    revalidate();
                                }}>
                                    Log out
                            </button>
                            <button className="btn btn-blue"
                                onClick={() => {
                                    setChangePassword("true");
                                }}>
                                    Change password
                            </button>
                        </div>
                        )}

                    {changePassword && loggedIn && (
                        <form onSubmit={handleSubmitPasswordChange} className="align-middle m-4">
                            <div className="block my-auto">
                                <label htmlFor="oldpassword" className="form-label">
                                    Old password
                                </label>
                                <input className="form-input w-2/4"
                                    type="password"
                                    id="oldpassword"
                                    value={oldPassword}
                                    onChange={e => setOldPassword(e.target.value)}
                                    required
                                />

                                <label htmlFor="newpassword" className="form-label">
                                    New password
                                </label>
                                <input className="form-input w-2/4"
                                    type="password"
                                    id="newpassword"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    required
                                />

                                <button type="submit" className="btn btn-blue flex mr-auto ml-auto mt-4">Change password</button>
                                {changePasswordMessage && <p style={{color: 'red'}}>{changePasswordMessage}</p>}
                            </div>
                        </form>
                    )}

                    {!loggedIn && (
                        <div className="text-center text-xl block text-gray-700">
                            <Link href="/login">
                                <a className="flex mr-auto ml-auto mb-8 w-40 hover:text-gray-900">Log in</a>
                            </Link>

                            <Link href="/signup">
                                <a className="flex mr-auto ml-auto mb-8 w-40 hover:text-gray-900">Sign up</a>
                            </Link>
                            <div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
            <footer className="absolute bottom-0 w-full">
                <CookieMessage>
                </CookieMessage>
            </footer>
            </body>
        </Layout>
    );
}

export default Home;
