import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Index = props => (
        <main className="center">
            <ul>
              {props.itemList.map((item, index) => (
                  <li key={index}>
                    <Link href="/items/[id]" as={`/items/${item['id']}`}>
                      <a>{item["name"]}</a>
                    </Link>
                  </li>
              ))}
            </ul>


            <style jsx>{`
              main {
                width: 90%;
                margin: 100px auto;
              }
            `}</style>
          </main>
);

Index.getInitialProps = async function() {
  const apiUrl = (process.env.API_URL ? process.env.API_URL : 'http://localhost:3000');
  const res = await fetch(apiUrl + '/api/items');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.itemList.length}`);

  return {
    itemList: data["itemList"]
  };
};

export default Index;