import Header from './Header';


const Layout = props => (
    <div>
        <Header />
            <div className="ml-6 text-blue-500">
                {props.children}
            </div>
    </div>
);

export default Layout;
