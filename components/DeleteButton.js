import fetch from '../libs/fetch'

export default function DeleteButton(props) {
    return <>
      <button onClick={() => {
        fetch(`/api/items/${props.id}`, { method: 'DELETE'
        }).then(res => {
            console.log("Success.");
            console.log(res);
        }).catch(err => {
            console.log("Error.");
            console.log(err);
        })
      }}>Delete</button>
    </>
}
