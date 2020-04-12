import fetch from '../libs/fetch'

export default function DeleteButton(props) {
    return <>
      <button onClick={() => {
        fetch(`/api/items/${props.id}`, { method: 'PATCH' , body: {
            id: props.id,
            name: props.name,
            description: props.description,
            lat: props.lat,
            lon: props.lon,
            pictureURI: props.pictureURI,
        }
        }).then(res => {
            console.log("Success.");
            console.log(res);
        }).catch(err => {
            console.log("Error.");
            console.log(err);
        })
      }}>Update</button>
    </>
}
