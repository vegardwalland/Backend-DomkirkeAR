import ItemList from '../components/ItemList';
import Layout from '../components/MyLayout';
import redirIfNotLoggedIn from '../libs/redirect';

export default function Index(props) {
    redirIfNotLoggedIn('/');
    return (
        <Layout>
            <ItemList />
        </Layout>
    );
};
