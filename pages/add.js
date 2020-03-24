import Layout from '../components/MyLayout';

export default function Add() {
    return (
        <Layout>
            <form action="/api/addItem" method="post" class="form-main">
                <fieldset>
                    <legend class="form-title">Detaljer</legend>
                        <div class="form-div"> 
                            <label class="form-label" for="name">
                                Navn
                            </label>
                            <input class="form-input" id="name" type="text"/>
                            <label class="form-label" for="description">
                                Beskrivelse
                            </label>
                            <textarea class="form-input" id="description"/>
                                <fieldset class="mt-2">
                                    <legend class="form-label"> Posisjon</legend>
                                    <label class="form-pos-label" for="latitude">
                                        Latitude
                                    </label>
                                    <input class="form-pos-input mr-2" id="latitude" type="text"/>
                                    <label class="form-pos-label" for="longitude">
                                        Longitude
                                    </label>
                                    <input class="form-pos-input" id="longitude" type="text"/>
                                </fieldset>
                        </div>
                </fieldset>
                <input class="btn btn-blue" type="submit" value="Lagre"/>
                <input class="btn btn-blue" type="submit" value="Avbryt"/>
            </form>
        </Layout>
    );
}