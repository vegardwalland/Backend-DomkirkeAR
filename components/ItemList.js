import useSwr from 'swr';
import fetch from '../libs/fetch';
import ItemLink from './ItemLink';

export default function ItemList(props) {
    const {data, error} = useSwr(`/api/items?fields=_id,name`, fetch)

    if (error) return <div>Failed to load list of all items</div>
    if (!data) return <div>Loading items...</div>

    const itemList = data.map((item, index) => {
        const altRow = index % 2
        const altStyling = altRow ? "bg-gray-300" : "";
        const className = "list-label border border-b-0 border-gray-600 py-4 pl-4 " + altStyling
        return <li className={className} key={item._id}><ItemLink item={item} /></li>;
    });

    return (
        <div>
            <ul className="block mt-4 border-b border-gray-600">
                {itemList}
            </ul>
        </div>
    );
}
