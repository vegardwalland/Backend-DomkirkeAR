import Head from 'next/head';
import fetch from '../libs/fetch';
import useSwr from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';
import Layout from '../components/MyLayout';
import { useState } from 'react';

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
      <div className="block text-center text-xl font-bold">
        <Head>
          <title>Gamle Stavanger AR</title>
          <meta classname="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main>
          <h1 className="text-3xl my-8">Gamle Stavanger AR-portal</h1>

          {loggedIn && (
            <div >
              <h2 className="my-16 text-gray-700">Velkommen {data.email}</h2>
              <button className="btn btn-blue"
                onClick={() => {
                  cookie.remove('token');
                  revalidate();
                }}>
                Logg ut
              </button>
              <button className="btn btn-blue"
                onClick={() => {
                  setChangePassword("true");
                }}>
                Endre passord
              </button>
            </div>
          )}

          {changePassword && loggedIn && (
            <form onSubmit={handleSubmitPasswordChange} className="align-middle m-4">
              <div className="block my-auto">
                <label htmlFor="oldpassword" className="form-label">
                  Gammelt Passord
                </label>
                <input className="form-input w-2/4"
                  type="password"
                  id="oldpassword"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  required
                />

                <label htmlFor="newpassword" className="form-label">
                  Nytt Passord
                </label>
                <input className="form-input w-2/4"
                  type="password"
                  id="newpassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />

                <button type="submit" className="btn btn-blue flex mr-auto ml-auto mt-4">Endre Passord</button>
                {changePasswordMessage && <p style={{color: 'red'}}>{changePasswordMessage}</p>}
              </div>
            </form>
          )}

          {!loggedIn && (
            <div className="text-center text-xl block text-gray-700">
              <Link href="/login">
                <a className="flex mr-auto ml-auto mb-8 w-40 hover:text-gray-900">Logg inn</a>
              </Link>
              <Link href="/signup">
                <a className="flex mr-auto ml-auto mb-8 w-40 hover:text-gray-900">Registrer bruker</a>
              </Link>
              <Link href="/forgetpassword/index">
                <a className="flex mr-auto ml-auto w-40 hover:text-gray-900">Glemt passord?</a>
              </Link>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}

export default Home;
