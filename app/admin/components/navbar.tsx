// components/navbar.tsx

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <div>
        <Link href="/addmedicine">
          <span className="link">Add Medicine</span>
        </Link>
        <Link href="/upgrademedicine">
          <span className="link">Upgrade Medicine</span>
        </Link>
        <Link href="/sellerslist">
          <span className="link">See Seller List</span>
        </Link>

        <Link href="/addprofile">
          <span className="link">Add Profile</span>
        </Link>
        <Link href="/adminlist">
          <span className="link">See Admin List</span>
        </Link>
        <Link href="/upgradeprofile">
          <span className="link">Upgrade your profile</span>
        </Link>
        <Link href="/banmanager">
          <span className="link">Ban Manager</span>
        </Link>
      </div>
      <style jsx>{`
        .link {
          margin-right: 20px;
          cursor: pointer;
          color: blue;
          text-decoration: underline;
        }

        .link:hover {
          color: darkblue;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
