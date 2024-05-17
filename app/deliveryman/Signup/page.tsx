"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  profilePic: File | null;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profilePic: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        formDataObject.append('firstName', formData.firstName);
        formDataObject.append('lastName', formData.lastName);
        formDataObject.append('email', formData.email);
        formDataObject.append('password', formData.password);
        formDataObject.append('phone', formData.phone);
        formDataObject.append('address', formData.address);
        if (formData.profilePic) {
          formDataObject.append('profilePic', formData.profilePic);
        }
        console.log(formDataObject);
        const response = await axios.post('http://localhost:3000/auth/register', formDataObject);
        
        toast.success('Signup successful!');
        router.push('/deliveryman/login');
     
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
    if (name === 'profilePic') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setErrors({ ...errors, [name]: null });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
        errors.lastName = 'Last name is required';
      }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (!formData.phone) {
        errors.phone = 'Name is required';
      }

    if (!formData.address) {
      errors.address = 'Address is required';
    }
    

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="firtName" className="block text-gray-700 font-bold mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone Number
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="profilePic" className="block text-gray-700 font-bold mb-2">
            Profile pic
          </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
               </div>
        <div className="flex items-center justify-between">
          <button
             type="submit"
             className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};