import useSwr from 'swr'
import fetch from '../libs/fetch'
import DeleteButton from './DeleteButton'
import ContentEditable from 'react-contenteditable'

function handleChange(e){

}

export default function Item(props) {
    const {data, error} = useSwr(`/api/items/${props.id}`, fetch)

    if (error) return <div>Failed to load item with id {props.id}</div>
    if (!data) return <div>Loading item...</div>

    const details = []
    for (const key in data) {
        details.push(<div key={key}>
            {key}:
            <ContentEditable
                html={data[key].toString()}
                onChange={handleChange}
            />
        </div>);
    }

    return (
        <div className="item_details">
            <h1>{data.name}</h1>
            {details}
            <DeleteButton id={props.id}/>
        </div>
    );
}
