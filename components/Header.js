import '../styles/style.css';
import cookie from 'js-cookie';
import Router from 'next/router';
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

//Check if a user is logged in
let logout = false;
if(jwt.decode(cookie.get("token"), jwtSecret) != null){
  let decoded = jwt.decode(cookie.get("token"), jwtSecret);
  logout = true;
  //Check if the token is expired
  if(decoded.exp < Date.now().valueOf() /1000) {
    logout = false;
  }
}

const Header = () => (
  <div className="border-b border-blue-500 w-full">
        <a className="nav-item ml-4" href="/">Home</a>
        <a className="nav-item" href="/add">Add</a>
        <a className="nav-item" href="/items">Browse</a>
        <div className="float-right mr-2">
          {/*Only show logout button if user is logged in*/}
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