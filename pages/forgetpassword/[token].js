import Layout from '../../components/MyLayout';
import fetch from 'isomorphic-unfetch';
import { useState } from 'react';

const ResetPasswordTokenPage = ({ valid, token }) => {
    const [password, setPassword] = useState('');
    const [userMessage, setUserMessage] = useState();

    function handleSubmit(event) {
      event.preventDefault();
      fetch(`/api/user/password/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          token,
        }),
      })
        .then((r) => {
          return r.json();
        })
        .then(data => {
          setUserMessage(data.message);
        });
    }
  
    return (
      <Layout>
        <div className="text-center text-xl align-middle font-bold">

          {valid ? (

              <form onSubmit={handleSubmit} className="">
                <h2 className="form-title">Glemt passord</h2>
                <div className="block">
                  <label htmlFor="password" className="form-label">Skriv inn ditt nye passord</label>
                  <input className="form-input mb-2 w-1/2"
                    name="password"
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-blue">Endre passord</button>
              </form>

          ) : (
            <p className="form-label">Linken er ikke gyldig lenger</p>
          )}
          {userMessage && (<p className="form-label"> {userMessage} </p>)}
        </div>
      </Layout>
    );
  };

    export async function getServerSideProps(context) {
      // Fetch data from external API
      const token = context.params.token;
      //Check if the token is valid in the database
      const valid = await fetch(
        `${process.env.WEB_URI}/api/user/password/${token}`,
        { method: 'POST' }
      )
        .then(res => res.text())
        .then(bol => bol === 'true');
    return { props: { token, valid } };
    };
  
  export default ResetPasswordTokenPage;