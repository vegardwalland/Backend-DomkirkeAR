import Layout from '../../components/MyLayout';
import { useState } from 'react';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState();
    const [userMessage, setUserMessage] = useState();
  
    function handleSubmit(event) {
        event.preventDefault();
        fetch('/api/user/password/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
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

        
        <form className="text-center text-blue-500 align-middle m-4" onSubmit={handleSubmit}>
        <h2 className="form-title text-xl font-bold">Glemt Passord?</h2>
          <div className="block my-auto">
            <p className="mt-1 mb-3 text-gray-700">Skriv inn din email under, så vil du få en mail for å resette ditt passord</p>

            <input className="form-input w-2/4"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button className="btn btn-blue flex mr-auto ml-auto mt-4" type="submit">Send email</button>
            {userMessage && (<p className="mt-3"> {userMessage}</p>)}
          </div>
        </form>
    
      
      </Layout>
    );
  };

  export default ForgetPasswordPage;
