
// export default function Login() {
//     return (
//       <div className="dark min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
//           <h2 className="text-2xl font-semibold text-white text-center">Login</h2>
//           <p className="mt-2 text-center text-gray-400">Access your account</p>
//           <form className="mt-4">
//             <div className="flex flex-col mb-4">
//               <label className="text-gray-300" htmlFor="login">
//                 Login
//               </label>
//               <input
//                 className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 id="login"
//                 placeholder="Enter your login"
//                 required
//                 type="text"
//               />
//             </div>
//             <div className="flex flex-col mb-6">
//               <label className="text-gray-300" htmlFor="password">
//                 Password
//               </label>
//               <input
//                 className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                 id="password"
//                 placeholder="Enter your password"
//                 required
//                 type="password"
//               />
//             </div>
//             <button className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600" type="submit">
//               Sign in
//             </button>
//             <button className="w-full mt-4 py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600" type="button">
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     )
//   }
  

"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

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
      const response = await axios.post('http://localhost:3000/auth/login', formData);
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

     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden sm:rounded-lg">
    <div className="px-6 py-8">
      <Toaster />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </button>
          <p className="mt-2 text-sm text-gray-600 text-center">
            Don't have an account yet?{' '}
            <a href="./Signup" className="font-medium text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>

  );
}