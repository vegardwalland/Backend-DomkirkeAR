import Layout from '../components/MyLayout';

export default function Add() {
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
                                    <legend className="form-label">Posisjon</legend>
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
                <input className="btn btn-blue" type="submit" value="Lagre"/>
                <input className="btn btn-blue" type="submit" value="Avbryt"/>
            </form>
        </Layout>
    );
}