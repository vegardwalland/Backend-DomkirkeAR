import Header from './Header';
import Head from 'next/head';

export default function Layout(props) {
    let title=""
    if (props.title) {
        title = " - " + props.title;
    }
    return (
            <div className="bg-gray-200 w-full h-screen">
                <Head>
                    <title>Gamle Stavanger AR{title}</title>
                    <meta className="viewport" content="initial-scale=1.0, width=device-width" />
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                </Head>
                <Header />
                <div className="text-blue-700">
                    {props.children}
                </div>
            </div>
    );
}
