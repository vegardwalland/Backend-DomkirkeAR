import Header from './Header';

const layoutStyle = {
    width: '90%',
    margin: '100px auto',
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'

};

const Layout = props => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
);

export default Layout;
