import Layout from '../../components/Layout';
import Item from '../../components/Item'

export default function Id(props) {
    return (
        <Layout title="Details">
            <Item id={props.url.query.id} />
        </Layout>
    );
}
