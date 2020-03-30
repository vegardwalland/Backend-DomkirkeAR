import Link from 'next/link';
import '../styles/style.css';
import cookie from 'js-cookie';
import Router from 'next/router';
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

let logout;
if(jwt.decode(cookie.get("token"), jwtSecret) != null){
  console.log(jwt.decode(cookie.get("token"), jwtSecret).email);
  logout = true;
}

const Header = () => (
  <div className="border-b border-blue-500 w-full">
        <a className="nav-item ml-4" href="/">Home</a>
        <a className="nav-item" href="/add">Add</a>
        <a className="nav-item" href="/items">Browse</a>
        <div className="float-right mr-2">
          {logout && (
            <button className="nav-item"
            onClick={() => {
              cookie.remove('token');
              Router.push('/');
            }}>
            Logout
          </button>
          )}
        </div>
  </div>
);

export default Header;