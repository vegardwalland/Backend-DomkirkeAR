import Header from './Header';


const Layout = props => (
    <div>
        <Header />
            <div class="ml-6">
                {props.children}
            </div>
    </div>
);

export default Layout;
