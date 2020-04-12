import useSwr from 'swr'
import fetch from '../libs/fetch'
import ItemLink from './ItemLink'

export default function ItemList(props) {
    const {data, error} = useSwr(`/api/items`, fetch)

    if (error) return <div>Failed to load list of all items</div>
    if (!data) return <div>Loading items...</div>

    const itemList = data.result.map(item => <li key={item.id}><ItemLink item={item} /></li>);
    
    return (
        <div>
            <ul>
                {itemList}
            </ul>
        </div>
    );
  }