import Layout from '../components/MyLayout';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { checkLogin, getTokenData } from '../lib/helperFunctions'

let authorized = checkLogin();
let tokenData = getTokenData();
let ableToEditUsers = false;
let messageColor = '';

function Add() {
    const [email, setEmail] = useState('');
    const [editUserMessage, setEditUserMessage] = useState('');
    
    useEffect(() => {
        if(!authorized){
            Router.replace('/');
            return;
        }
    });

    if(tokenData){
        if(tokenData.editAuthorized){
            ableToEditUsers = true;
        }
    }

    function handleChangeUserSubmit(e) {
        e.preventDefault();
        fetch('api/editUserAccess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
            }),
        })
        .then((r) => r.json())
        .then((data) => {
            if(data && data.error) {                
                messageColor = 'red';
                setEditUserMessage(data.message);
            }
            if(data && !data.error) {                
                messageColor = 'green';
                setEditUserMessage(data.message);
            }
        });
    }

        return (
            <Layout>
                <form action="/api/addItem" method="post" className="form-main">
                    <fieldset>
                        <legend className="form-title">Detaljer</legend>
                            <div className="form-div"> 
                                <label className="form-label" htmlFor="name">
                                    Navn
                                </label>
                                <input className="form-input" id="name" type="text"/>
                                <label className="form-label" htmlFor="description">
                                    Beskrivelse
                                </label>
                                <textarea className="form-input" id="description"/>
                                    <fieldset className="mt-2">
                                        <legend className="form-label"> Posisjon</legend>
                                        <label className="form-pos-label" htmlFor="latitude">
                                            Latitude
                                        </label>
                                        <input className="form-pos-input mr-2" id="latitude" type="text"/>
                                        <label className="form-pos-label" htmlFor="longitude">
                                            Longitude
                                        </label>
                                        <input className="form-pos-input" id="longitude" type="text"/>
                                    </fieldset>
                            </div>
                    </fieldset>
                    <div className="my-2">
                    <input className="btn btn-blue" type="submit" value="Lagre"/>
                    <input className="btn btn-blue" type="submit" value="Avbryt"/>
                    </div>
                </form>
                
                {ableToEditUsers && 
                <form className="form-main mt-16" onSubmit={handleChangeUserSubmit}>
                    <fieldset>
                        <legend className="form-title">Endre brukertillatelse</legend>
                            <div className="form-div mb-3"> 
                                <label className="form-label" htmlFor="email">
                                    Email
                                </label>
                                <input className="form-input" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name="email" 
                                type="text"/>
                            </div>
                    </fieldset>
                    <div className="my-2">
                    <input className="btn btn-blue" type="submit" value="Endre brukertilgang"/>
                    <input className="btn btn-blue" type="submit" value="Avbryt"/>
                    </div>
                    {editUserMessage && <p style={{color: messageColor}}>{editUserMessage}</p>}
                </form>
                }
            </Layout>
        );
    }

export default Add;
