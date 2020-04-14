import '../styles/style.css';
import cookie from 'js-cookie';
import Router from 'next/router';
import { checkLogin } from '../libs/helperFunctions'


//Check if a user is logged in
let showLogoutButton = checkLogin();

const Header = () => (
  <div className="border-b border-blue-500 w-full">
        <a className="nav-item ml-4" href="/">Home</a>
        <a className="nav-item" href="/add">Add</a>
        <a className="nav-item" href="/items">Browse</a>
        <div className="float-right mr-2">
          {/*Only show logout button if user is logged in*/}
          {showLogoutButton && (
            <button className="nav-item"
            onClick={() => {
              cookie.remove('token');
              Router.push('/');
            }}>
            Logg ut
          </button>
          )}
        </div>
  </div>
);

export default Header;
