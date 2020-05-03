import Router from 'next/router';
import { useEffect, useState } from 'react';
import { checkLogin, getTokenData } from '../libs/helperFunctions';
import fetch from '../libs/fetch';
import Layout from '../components/MyLayout';

let authorized = checkLogin();
let tokenData = getTokenData();
let ableToEditUsers = false;
let messageColor = '';

export default function Settings() {
    const [email, setEmail] = useState('');
    const [editUserMessage, setEditUserMessage] = useState('');

    // TODO, another way to do redirection?
    useEffect(() => {
        if (!authorized) {
            Router.replace('/');
            return;
        }
    });

    if (tokenData) {
        if (tokenData.editAuthorized) {
            ableToEditUsers = true;
        }
    }

    function handleChangeUserSubmit(e) {
        e.preventDefault();

        fetch('api/user/editUserAccess', {
            method: 'POST',
            body: {
                email,
            }
        }).then(res => {
            if (res && res.error) {
                messageColor = 'red';
                setEditUserMessage(res.message);
            }
            if (res && !res.error) {
                messageColor = 'green';
                setEditUserMessage(res.message);
            }
        });
    };

    return(
        <Layout>
            {ableToEditUsers &&
            <form className="form-main mt-16" onSubmit={handleChangeUserSubmit}>
                <fieldset>
                    <legend className="form-title">Grant item editing abilities</legend>
                    <div className="form-div mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="text"/>
                    </div>
                </fieldset>
                <div className="my-2">
                    <input className="btn btn-blue" type="submit" value="Update"/>
                </div>
                {editUserMessage && <p style={{color: messageColor}}>{editUserMessage}</p>}
            </form>
            }
        </Layout>
    );
}