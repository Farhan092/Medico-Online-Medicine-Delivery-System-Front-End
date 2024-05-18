"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
  phone: string;
  address: string;
  age: string;
  userId: string;
}

const UpdateProfile: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    address: '',
    age: '',
    userId: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:3002/admin/addprofile/${formData.userId}`, {
          phone: formData.phone,
          address: formData.address,
          age: formData.age,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success('Information Added successfully!');
        router.push('/dashboard');
      } catch (error: any) { // Specify the type of 'error' as 'any'
        console.error('Error updating profile:', error);
        toast.error(`Failed to Add information: ${error.message}`);
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

    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address) {
      errors.address = 'Address is required';
    }

    if (!formData.age || isNaN(parseInt(formData.age))) {
      errors.age = 'Please enter a valid age';
    }

    if (!formData.userId) {
      errors.userId = 'User ID is required';
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Add Profile</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
            Phone
          </label>
          <input
            type="text"
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

        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.age && <p className="text-red-500 text-xs italic">{errors.age}</p>}
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
            Add Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
