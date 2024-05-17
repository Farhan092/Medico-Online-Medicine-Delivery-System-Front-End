"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

import NavBar from '../components/navbar';
import TopBar from '../components/topbar';

interface FormData {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:7000/auth/login', formData);
      console.log(response.data);

      const  token  = response.data;
      console.log(token.access_token);
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('email', formData.email);

      

      toast.success('Sign in successful');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in:', error);
      toast.error('Sign in failed. Please check your credentials.');
    }
  };


  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <TopBar />
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-md">
          <Toaster />
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 mb-8">Sign In</h2>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input id="email" name="email" type="text" autoComplete="email" className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Email address" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <NavBar />
    </div>
  );
  
}
