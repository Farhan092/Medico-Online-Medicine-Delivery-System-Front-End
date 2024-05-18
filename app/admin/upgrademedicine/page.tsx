"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
  medicineName: string;
  prize: string;
  medicinePicture: File | null;
  medicineId: string; 
}

const UpdateMedicine: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    medicineName: '',
    prize: '',
    medicinePicture: null,
    medicineId: '', // Initialize medicineId state
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
        try {
          const formDataObject = new FormData();
          formDataObject.append('medicineName', formData.medicineName);
          formDataObject.append('prize', formData.prize);
          formDataObject.append('medicineId', formData.medicineId);
  
          if (formData.medicinePicture) {
            formDataObject.append('medicinePic', formData.medicinePicture);
          }
  
          const token = localStorage.getItem('token'); 
          const response = await axios.put(`http://localhost:3002/admin/updatemedicine/${formData.medicineId}`, formDataObject, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
  
          toast.success('Medicine updated successfully!');
          router.push('/dashboard');
        } catch (error) {
          console.error('Error updating medicine:', error);
          toast.error('Failed to update medicine. Please try again.');
        }
      } else {
        setErrors(validationErrors);
      }
    };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'medicinePicture') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setErrors({ ...errors, [name]: null });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.medicineName) {
      errors.medicineName = 'Name is required';
    }

    if (!formData.prize) {
      errors.prize = 'Prize is required';
    }

    if (!formData.medicineId) {
      errors.medicineId = 'Medicine ID is required';
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Update Medicine</h1>
      <Toaster />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="medicineName" className="block text-gray-700 font-bold mb-2">
            Medicine Name
          </label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.medicineName && <p className="text-red-500 text-xs italic">{errors.medicineName}</p>}
        </div>
        
        <div className="mb-4">
          <label htmlFor="prize" className="block text-gray-700 font-bold mb-2">
            Prize
          </label>
          <input
            type="text"
            id="prize"
            name="prize"
            value={formData.prize}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.prize && <p className="text-red-500 text-xs italic">{errors.prize}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="medicineId" className="block text-gray-700 font-bold mb-2">
            Medicine ID
          </label>
          <input
            type="text"
            id="medicineId"
            name="medicineId"
            value={formData.medicineId}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.medicineId && <p className="text-red-500 text-xs italic">{errors.medicineId}</p>}
        </div>
        
        <div className="mb-6">
          <label htmlFor="myfile" className="block text-gray-700 font-bold mb-2">
            File Upload
          </label>
          <input
            type="file"
            id="myfile"
            name="medicinePicture"
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMedicine;
