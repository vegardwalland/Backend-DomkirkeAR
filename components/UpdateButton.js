import fetch from '../libs/fetch'

export default function UpdateButton(props) {
    return <>
      <button onClick={() => {
        fetch(`/api/items/${props.id}`, { method: 'PATCH' , body: {
            id: props.item.id,
            name: props.item.name,
            description: props.item.description,
            lat: props.item.lat,
            lon: props.item.lon,
            pictureURI: props.item.pictureURI,
          }
        })
      }}>Update</button>
    </>
}
