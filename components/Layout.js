import Header from './Header';

export default function Layout(props) {
    return (
        <div className="bg-gray-200 w-full h-screen">
            <Header />
            <div className="text-blue-700">
                {props.children}
            </div>
        </div>
    );
}
