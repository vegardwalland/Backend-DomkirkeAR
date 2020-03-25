import Link from 'next/link';
import '../styles/style.css';


const Header = () => (
  <div className="border-b border-blue-500 w-full">
    <ul className="flex ml-4">
      <li className="mr-4">
        <a className="nav-item" href="/">Home</a>
        </li>
      <li className="mr-4"> 
        <a className="nav-item" href="/add">Add</a>
      </li>
      <li className="mr-1"> 
        <a className="nav-item" href="/items">Browse</a>
      </li>
    </ul>
  </div>
);

export default Header;