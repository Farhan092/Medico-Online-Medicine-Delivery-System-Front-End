
"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Session from '../components/session';
import UserCard from '../components/usercard';
import Link from 'next/link';
import Navbar from '../components/navbar';

// Define the UserData interface
interface UserData {
  userId: string;
  userName: string;
  email: string;
  profilePicture: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');

        if (token && email) {
          const response = await axios.get<UserData>(`http://localhost:3002/admin/getusers/${email}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserData(response.data);
        } else {
          throw new Error('Token or email not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error here (e.g., redirect to login page)
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures useEffect runs only once when component mounts

  return (
    <>
      <Navbar />
      <Session />
      <div className="">
  <Toaster />
  <div className="grid grid-cols-4 gap-2">
    {userData && <UserCard data={userData} />}
  </div>
</div>

    </>
  );
}
