'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import NavBar from '../../components/navbar';
import TopBar from '../../components/topbar';

interface FormData {
  productName: string;
  productDescription: string;
  productManufacturer: string;
  productQuantity: string;
  productPrice: string;
  filename: File | null;
}

export default function AddProduct() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    productName: '',
    productDescription: '',
    productManufacturer: '',
    productQuantity: '',
    productPrice: '',
    filename: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key === 'filename' && value) {
            formDataObject.append(key, value);
          } else {
            formDataObject.append(key, value.toString());
          }
        });

        const response = await axios.post('http://localhost:7000/seller/addproduct', formDataObject);

        toast.success('Product added successfully!');
        //router.push('/');
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'filename') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files.length ? fileInput.files[0] : null;
      setFormData({ ...formData, filename: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.productName) {
      errors.productName = 'Product Name is required';
    } else if (!/^[a-zA-Z]+$/.test(formData.productName)) {
      errors.productName = 'Product Name must contain only alphabets';
    }
    

    if (!formData.productDescription) {
      errors.productDescription = 'Product Description is required';
    }

    if (!formData.productManufacturer) {
      errors.productManufacturer = 'Product Manufacturer is required';
    }

    if (!formData.productQuantity) {
      errors.productQuantity = 'Product Quantity is required';
    } else if (isNaN(Number(formData.productQuantity))) {
      errors.productQuantity = 'Product Quantity must be a number';
    }

    if (!formData.productPrice) {
      errors.productPrice = 'Product Price is required';
    } else if (isNaN(Number(formData.productPrice))) {
      errors.productPrice = 'Product Price must be a number';
    }



    return errors;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TopBar/>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-700 font-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-700 font-bold mb-2">
            Product Description
          </label>
          <input
            type="text"
            id="productDescription"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.productDescription && <p className="text-red-500 text-xs italic">{errors.productDescription}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="productManufacturer" className="block text-gray-700 font-bold mb-2">
            Product Manufacturer
          </label>
          <input
            type="text"
            id="productManufacturer"
            name="productManufacturer"
            value={formData.productManufacturer}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.productManufacturer && <p className="text-red-500 text-xs italic">{errors.productManufacturer}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="productQuantity" className="block text-gray-700 font-bold mb-2">
            Product Quantity
          </label>
          <input
            type="text"
            id="productQuantity"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.productQuantity && <p className="text-red-500 text-xs italic">{errors.productQuantity}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="productPrice" className="block text-gray-700 font-bold mb-2">
            Product Price
          </label>
          <input
            type="text"
            id="productPrice"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.productPrice && <p className="text-red-500 text-xs italic">{errors.productPrice}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="filename" className="block text-gray-700 font-bold mb-2">
            Product Image
          </label>
          <input
            type="file"
            id="filename"
            name="filename"
            onChange={handleInputChange}
            
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
      <NavBar />
    </div>
  );
};



