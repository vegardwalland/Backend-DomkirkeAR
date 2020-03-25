import Header from './Header';


const Layout = props => (
    <div>
        <Header />
            <div className="ml-6">
                {props.children}
            </div>
    </div>
);

export default Layout;
