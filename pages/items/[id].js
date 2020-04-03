import fetch from 'isomorphic-unfetch';
import { withRouter } from 'next/router'

export default function Id(props) {
    const item = props.item;
    const details = []
    for (const key in item) {
        details.push(<li>{key}: {item[key]}</li>);
    }

  return (
    <main className="center">
        {details}

        <style jsx>{`
        main {
            width: 90%;
            margin: 100px auto;
        }
        `}</style>
    </main>
  );
}


Id.getInitialProps = async function(router) {
    const apiUrl = (process.env.API_URL ? process.env.API_URL : 'http://localhost:3000');
    const id = router.query.id;

    const res = await fetch(apiUrl + `/api/items?id=${id}`);
    const data = await res.json();

    console.log(data);

    return {
         "item": data
    };
};
