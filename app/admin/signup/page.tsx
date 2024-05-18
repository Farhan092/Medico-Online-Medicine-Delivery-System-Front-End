"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
    userName: string;
  email: string;
  password: string;

  myfile: File | null;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    email: '',
    password: '',
   
    myfile: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        formDataObject.append('userName', formData.userName);
        formDataObject.append('email', formData.email);
        formDataObject.append('password', formData.password);
        
        if (formData.myfile) {
          formDataObject.append('myfile', formData.myfile);
        }
        console.log(formDataObject);
        const response = await axios.post('http://localhost:3002/admin/addadmin', formDataObject);
        
        toast.success('Signup successful!');
        router.push('/signin');
     
      } catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'myfile') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setErrors({ ...errors, [name]: null });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.userName) {
      errors.userName = 'Name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

  
    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.userName && <p className="text-red-500 text-xs italic">{errors.userName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="myfile" className="block text-gray-700 font-bold mb-2">
            File Upload
          </label>
          <input
            type="file"
            id="myfile"
            name="myfile"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
               </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};