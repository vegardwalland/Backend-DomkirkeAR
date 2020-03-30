import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr';
import Link from 'next/link';
import cookie from 'js-cookie';
import Layout from '../components/MyLayout';

function Home() {
  const {data, revalidate} = useSWR('/api/me', async function(args) {
    const res = await fetch(args);
    return res.json();
  });
  if (!data) return <h1>Loading...</h1>;
  let loggedIn = false;
  if (data.email) {
    loggedIn = true;
  }
  return (
    <Layout>
      <div>
        <Head>
          <title>Gamle Stavanger AR</title>
          <meta classname="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main className="relative">
          <h1 className=" text-center text-blue-500 text-3xl mb-6">Gamle Stavanger AR-portal</h1>

          {loggedIn && (
            <div className="text-center text-blue-500 text-xl">
              <h2 className="mb-4">Welcome {data.email}!</h2>
              <button className="btn btn-blue"
                onClick={() => {
                  cookie.remove('token');
                  revalidate();
                }}>
                Logout
              </button>
            </div>
          )}
          {!loggedIn && (
            <div className="text-center text-blue-500 text-xl">
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