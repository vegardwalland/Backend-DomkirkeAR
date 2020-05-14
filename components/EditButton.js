import Link from 'next/link'

export default function DeleteButton(props) {
    return (
        <button className="btn btn-blue">
            <Link href="/edit/[id]" as={`/edit/${props.id}`}>
                <a>Edit</a>
            </Link>
        </button>
    )
}
