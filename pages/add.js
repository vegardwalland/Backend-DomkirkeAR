import React, { useState } from 'react';
import axioswal from 'axioswal';
import Layout from '../components/MyLayout';

export default function Add() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [pictureURI, setPictureURI] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        axioswal.post('api/items', {
            name,
            description,
            lat,
            lon,
            pictureURI,
        }).then((data) => {
            if (data.status === 'ok') {
                ;
            }
        });
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Det gamle posthuset"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="Oppført i 1911, revet i 1972."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label>Latitude</label>
                    <input
                        type="text"
                        placeholder="58.969124"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                    />
                </div>

                <div>
                    <label>Longitude</label>
                    <input
                        type="text"
                        placeholder="5.71693"
                        value={lon}
                        onChange={e => setLon(e.target.value)}
                    />
                </div>

                <button type="submit">Sign up</button>
            </form>
        </Layout>
    );
}