import useSwr from 'swr'
import fetch from '../libs/fetch'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'

export default function Item(props) {
    const {data, error} = useSwr(`/api/items/${props.id}`, fetch)

    if (error) return <div>Failed to load item with id {props.id}</div>
    if (!data) return <div>Loading item...</div>

    const details = []
    for (const key in data) {
        details.push(<div className="mb-2" key={key}>
            <h2 className="form-label">{key}:</h2>
            <div className="ml-2">
                {data[key].toString()}
            </div>
        </div>);
    }

    return (
        <div className="item_details mt-4 pl-4 pb-2">
            <h1 className="form-title">{data.name}</h1>
            {details}
            <EditButton id={props.id}/>
            <DeleteButton id={props.id}/>
        </div>
    );
}
