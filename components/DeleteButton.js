import fetch from '../libs/fetch'

export default function DeleteButton(props) {
    return <>
      <button onClick={() => {
        fetch(`/api/items/${props.id}`, { method: 'DELETE' });
      }}>Delete</button>
    </>
}
