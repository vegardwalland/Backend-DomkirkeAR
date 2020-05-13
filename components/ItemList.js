import useSwr from 'swr';
import fetch from '../libs/fetch';
import ItemLink from './ItemLink';

export default function ItemList(props) {
    const {data, error} = useSwr(`/api/items?fields=_id,name`, fetch)

    if (error) return <div>Failed to load list of all items</div>
    if (!data) return <div>Loading items...</div>

    const itemList = data.map((item, index) => {
        const altRow = index % 2
        const altStyling = altrow ? "bg-gray-500" : "";
        return <li className=" {altStyling}" key={item._id}><ItemLink item={item} /></li>;
    });

    return (
        <div>
            <ul>
                {itemList}
            </ul>
        </div>
    );
}
