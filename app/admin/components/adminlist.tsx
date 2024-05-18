"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  address: string;
  filename: string
}

export default function Session () {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
        if (token) {
          const response = await axios.get('http://localhost:3002/admin/getusers/'+email, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data);
        } else {
          router.push('/signin');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/signin');
      } 
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return <div></div>;
  }

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.push('/signin');
  };


  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl"><li>Here are the  list</li>{user && user.name}</a>
    </div>
    
  </div>
  );
};