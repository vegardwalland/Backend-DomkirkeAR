import axioswal from 'axioswal';
import ItemInput from './ItemInput';

export default function Add() {
    return (
        <ItemInput handleSubmit={addItem} />
    );
}

const addItem = (values) => {
    // TODO Use fetch instead of axioswal, but keep those nice animations maybe.
    axioswal.post('api/items', {
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
