import '../styles/style.css';
import cookie from 'js-cookie';
import Router from 'next/router';
import { checkLogin } from '../libs/helperFunctions'
import Link from 'next/link'


//Check if a user is logged in
let showLogoutButton = checkLogin();

const Header = () => (
  <div className="border-b border-blue-500 w-full">
    <Link href="/">
      <a className="nav-item ml-4">Home</a>
    </Link>
    <Link href="/add">
      <a className="nav-item">Add</a>
    </Link>
    <Link href="/items">
      <a className="nav-item">Browse</a>
    </Link>
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
