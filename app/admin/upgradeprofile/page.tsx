"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
  userName: string;
  email: string;
  password: string;
  userId: string;
}

const UpdateProfile: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userName: '',
    email: '',
    password: '',
    userId: '', // Initialize userId state
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://localhost:3002/admin/updateadmin/${formData.userId}`, {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success('Profile updated successfully!');
        router.push('/dashboard');
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
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

    if (!formData.userId) {
      errors.userId = 'User ID is required';
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <label htmlFor="userId" className="block text-gray-700 font-bold mb-2">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.userId && <p className="text-red-500 text-xs italic">{errors.userId}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
