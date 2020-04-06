import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Layout from '../components/MyLayout';
import { useUser, handleLogout } from '../lib/hooks';

function Home() {
  const [user, { mutate }] = useUser();

  let loggedIn = false;
  if (user) {
    loggedIn = true;
  }
  console.log(user)
  return (
    <Layout>
      <div>
        <Head>
          <title>Gamle Stavanger AR</title>
          <meta classname="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main className="relative">
          <h1 className=" text-center text-3xl mb-6">Gamle Stavanger AR-portal</h1>

          {loggedIn && (
            <div className="text-center text-xl">
              <h2 className="mb-4">Welcome {user.email}!</h2>
              <button className="btn btn-blue"
                onClick={handleLogout()}>
                Logout
              </button>
            </div>
          )}
          {!loggedIn && (
            <div className="text-center text-xl">
              <Link href="/login">
                <a className="btn btn-blue">Login</a>
              </Link>
              <p className="my-4">or</p>
              <Link href="/signup">
                <a className="btn btn-blue">Sign Up</a>
              </Link>
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}

export default Home;