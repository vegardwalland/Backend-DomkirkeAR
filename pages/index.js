import useSWR from 'swr';

function fetcher(url) {
    return fetch(url).then(r => r.json());
}

export default function Index() {
    const { data, error } = useSWR('/api/getItem', fetcher);

    let item = data?.item;
    let tags = data?.tags;

    if (!data){
      item = 'Loading';
      tags = [''];
    }
    if (error) item = 'Failed to fetch the item';

    return (
        <main className="center">
          <div className="quote">{item}</div>
          {item} er:
          <ul>
            {tags.map(tag => (
              <li>{tag}</li>
            ))}
          </ul>
    
          <style jsx>{`
            main {
              width: 90%;
              max-width: 900px;
              margin: 300px auto;
              text-align: center;
            }
            .quote {
              font-family: cursive;
              color: #e243de;
              font-size: 24px;
              padding-bottom: 10px;
            }
            .author {
              font-family: sans-serif;
              color: #559834;
              font-size: 20px;
            }
          `}</style>
        </main>
      );
}