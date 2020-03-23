import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/add">
      <a style={linkStyle}>Add</a>
    </Link>
    <Link href="/items">
      <a style={linkStyle}>Browse</a>
    </Link>
  </div>
);

export default Header;