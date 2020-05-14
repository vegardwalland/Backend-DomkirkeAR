import '../styles/style.css';
import cookie from 'js-cookie';
import Router from 'next/router';
import { isLoggedIn } from '../libs/helperFunctions'
import Link from 'next/link'

export default function Header() {
    // Check if a user is logged in
    // TODO Invalidate token server-side when logging out?
    const showLogoutButton = isLoggedIn();

    return (
        <div className="border-b border-blue-500 w-full">
            <Link href="/">
                <a className="nav-item ml-4">Home</a>
            </Link>
            <Link href="/add">
                <a className="nav-item">Add</a>
            </Link>
            <Link href="/browse">
                <a className="nav-item">Browse</a>
            </Link>
            <div className="float-right mr-2">
                <Link href="/privacy-policy">
                    <a className="nav-item">Privacy Policy</a>
                </Link>
                {/* Only show logout button if user is logged in */}
                {showLogoutButton && (<>

                        <Link href="/settings">
                            <a className="nav-item">Settings</a>
                        </Link>

                        <button
                            className="nav-item"
                            onClick={() => {
                                cookie.remove('token');
                                Router.push('/');
                            }}
                        >
                        Logg ut
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
