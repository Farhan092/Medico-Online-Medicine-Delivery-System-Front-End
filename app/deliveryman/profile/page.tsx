'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [updateData, setUpdateData] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    profilePic: null,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get('http://localhost:3000/deliveryman/getusers/'+email, { headers });
      setProfile(response.data);
      setUpdateData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdateData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setUpdateData((prevData: any) => ({ ...prevData, profilePic: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const profileData = {
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        email: updateData.email,
        address: updateData.address,
        phone: updateData.phone
      };

      const profileUpdateResponse = await axios.patch(
        `http://localhost:3000/deliveryman/updatedeliveryman/${email}`,
        profileData,
        { headers }
      );

      if (profileUpdateResponse.status !== 200) {
        throw new Error('Failed to update profile');
      }

      if (updateData.profilePic) {
        const formData = new FormData();
        formData.append('profilePic', updateData.profilePic);

        const picUpdateResponse = await axios.put(
          `http://localhost:3000/deliveryman/updatepic/${email}`,
          formData,
          { headers: { ...headers, 'Content-Type': 'multipart/form-data' } }
        );

        if (picUpdateResponse.status !== 200) {
          throw new Error('Failed to update profile picture');
        }
      }

      alert('Profile updated successfully!');
      setProfile(updateData);
      toggleEditMode();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');

      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`http://localhost:3000/deliveryman/deleteProfile/${email}`, { headers });

      if (response.status === 200) {
        alert('Profile deleted successfully!');
        router.push('/deliveryman/login'); // Redirect to sign-in page after deletion
      } else {
        throw new Error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-8">
        <div>
          {isEditMode ? (
            <EditProfile 
              updateData={updateData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              toggleEditMode={toggleEditMode}
              handleDeleteProfile={handleDeleteProfile}
            />
          ) : (
            <ViewProfile profile={profile} toggleEditMode={toggleEditMode} handleDeleteProfile={handleDeleteProfile} />
          )}
        </div>
      </div>
    </div>
  );
};

const ViewProfile = ({ profile, toggleEditMode, handleDeleteProfile }: { profile: any, toggleEditMode: () => void, handleDeleteProfile: () => void }) => {
  if (!profile) return null;

  return (
<div className=" ml-[400px] mt-10">
  <div className="bg-white shadow-md rounded-lg p-6 ">
    <h1 className="text-2xl font-bold mb-4 text-center">View Profile</h1>
    <div className=" items-center justify-center mb-4">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <img className="w-full h-full object-cover" alt="Profile Picture" src={`http://localhost:3000/deliveryman/getimage/${profile.filename}`} />
      </div>
    </div>
    <div className="mb-2">Name: {profile.firstName} {profile.lastName}</div>
    <div className="mb-2">Email: {profile.email}</div>
    <div className="mb-2">Address: {profile.address}</div>
    <div className="mb-2">phone: {profile.phone}</div>
    <button onClick={toggleEditMode} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Edit Profile</button>
  </div>
</div>

  );
};

const EditProfile = ({ updateData, handleInputChange, handleFileChange, handleSubmit, toggleEditMode, handleDeleteProfile }: { 
  updateData: any,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  toggleEditMode: () => void,
  handleDeleteProfile: () => void
}) => {
  return (
<div className="justify-center items-center  bg-gray-100 rounded p-20 m-14">
  <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
    <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="firstName"
          value={updateData.firstName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>

        <input
          type="text"
          name="lastName"
          value={updateData.lastName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mt-3"/>
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={updateData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          readOnly
        />
      </div>

      <div className="mb-6">
        <label htmlFor="address" className="block mb-2 font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={updateData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="address" className="block mb-2 font-medium text-gray-700">phone</label>
        <input
          type="number"
          name="phone"
          value={updateData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="profilepic" className="block mb-2 font-medium text-gray-700">Profile Picture</label>
        <input
          type="file"
          name="profilepic"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-between">
        <button type="submit" className="w-1/2 bg-[#22c55e] hover:bg-[#16a34a] text-white py-2 px-4 rounded focus:outline-none   mr-2">Update Profile</button>
        <button onClick={toggleEditMode} className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500">Cancel</button>
      </div>
    </form>
    <button onClick={handleDeleteProfile} className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500">Delete Profile</button>
  </div>
</div>

  );
};

export default Profile;