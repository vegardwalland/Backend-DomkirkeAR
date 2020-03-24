import Link from 'next/link';
import '../styles/style.css';


const Header = () => (
  <div class="border-b border-blue-500 w-full">
    <ul class="flex ml-4">
      <li class="mr-4">
        <a class="nav-item" href="/">Home</a>
        </li>
      <li class="mr-4"> 
        <a class="nav-item" href="/add">Add</a>
      </li>
      <li class="mr-1"> 
        <a class="nav-item" href="/items">Browse</a>
      </li>
    </ul>
  </div>
);

export default Header;