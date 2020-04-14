import Header from './Header';


const Layout = props => (
    <div className="bg-gray-200 w-full h-screen">
        <Header />
            <div className="ml-6 text-blue-700">
                {props.children}
            </div>
    </div>
);

export default Layout;
