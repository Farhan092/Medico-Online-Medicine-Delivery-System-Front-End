import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TopBar = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      router.push('/signin');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/signin');
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/dashboard">
          <span className="btn btn-ghost text-xl cursor-pointer">Medico: Online Medicine Delivery</span>
        </Link>
      </div>
      
      <div className="flex-none flex items-center">
      
        <Link href="/product">
          <div className="btn btn-ghost btn-circle mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M15 8a2 2 0 11-4 0 2 2 0 014 0zm-4-6a2 2 0 00-2 2v2h2V4zM3 5a2 2 0 012-2h2v2H5a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h12a.5.5 0 00.5-.5v-12a.5.5 0 00-.5-.5H16V3a2 2 0 00-2-2H5a2 2 0 00-2 2zM3 17V7h14v10H3z" clipRule="evenodd" />
            </svg>
          </div>
        </Link>
      </div>
      {authenticated && (
        
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link href="/profile">
                  <div className="justify-between cursor-pointer">
                    Profile
                  </div>
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;

