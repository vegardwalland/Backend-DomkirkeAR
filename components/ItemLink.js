import Link from 'next/link';

export default function ItemLink(props) {
    return (
        <div>
            <Link href="/items/[id]" as={`/items/${props.item._id}`}>
                <a>{props.item.name}</a>
            </Link>
        </div>
    )
}
