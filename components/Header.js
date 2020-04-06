import '../styles/style.css';
import React from 'react';
import { useUser } from '../lib/hooks';

const navBar = () => {

  const [user, { mutate }] = useUser();
  /*const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    // set the user state to null
    mutate(null);
  };
  */
  let logout = false;
  if (user) {
    logout = true;
  }

  return(
    <div className="border-b border-blue-500 w-full">
          <a className="nav-item ml-4" href="/">Home</a>
          <a className="nav-item" href="/add">Add</a>
          <a className="nav-item" href="/items">Browse</a>
          <div className="float-right mr-2">
            {/*Only show logout button if user is logged in*/}
            {logout && (
              <button className="nav-item"

              >
              Logout
            </button>
            )}
          </div>
    </div>
  );
};

export default navBar;