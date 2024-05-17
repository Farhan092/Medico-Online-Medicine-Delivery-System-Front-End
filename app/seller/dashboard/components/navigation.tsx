// components/Navigation.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navigation: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className={`text-xl font-bold cursor-pointer ${router.pathname === '/' ? 'opacity-50' : ''}`}>
            Dashboard
          </div>
        </Link>
        <div>
          <Link href="/medicines">
            <div className="mx-4 cursor-pointer">Medicines</div>
          </Link>
          <Link href="/orders">
            <div className="cursor-pointer">Orders</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
