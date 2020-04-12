import Link from 'next/link';

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/add">
      <a style={linkStyle}>Add</a>
    </Link>
    <Link href="/browse">
      <a style={linkStyle}>Browse</a>
    </Link>
  </div>
);

export default Header;