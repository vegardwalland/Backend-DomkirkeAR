import Layout from '../../components/MyLayout';
import Item from '../../components/Item'

export default function Id(props) {
    return (
        <Layout>
            <Item id={props.url.query.id} />
        </Layout>
    );
}
