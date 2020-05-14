import Layout from '../../components/Layout';
import EditItemForm from '../../components/EditItemForm'

export default function Id(props) {
    return (
        <Layout>
            <EditItemForm id={props.url.query.id} />
        </Layout>
    );
}
