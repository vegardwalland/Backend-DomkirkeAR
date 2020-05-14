import axioswal from 'axioswal';
import ItemInput from './ItemInput';
import useSwr from 'swr'

export default function EditItemForm(props) {

    const {data, error} = useSwr(`/api/items/${props.id}`, fetch)

    if (error) return <div>Failed to load item with id {props.id}</div>
    if (!data) return <div>Loading item...</div>
    return (
        <ItemInput handleSubmit={editItem} item={data} />
    );
}

const editItem = (values) => {
    // TODO Use fetch instead of axioswal, but keep those nice animations maybe.
    axioswal.patch(`/api/items/${values.id}`, {
        name: values.name,
        description: values.description,
        lat: values.lat,
        lon: values.lon,
        pictureURI: values.pictureURI,
    }).then((data) => {
        if (data.status === 'ok') {
            ;
        }
    });
};
