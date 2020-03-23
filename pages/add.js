import Layout from '../components/MyLayout';

export default function Add() {
    return (
        <Layout>
            <form action="/api/addItem" method="post">
                <fieldset>
                    <legend>Basic details</legend>
                    <input type="text"/>
                </fieldset>
                <button>Add</button>
            </form>
        </Layout>
    );
}