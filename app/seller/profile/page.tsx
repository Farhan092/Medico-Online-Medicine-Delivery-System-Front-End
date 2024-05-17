'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import NavBar from '../components/navbar';
import TopBar from '../components/topbar';

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [updateData, setUpdateData] = useState<any>({
    name: '',
    email: '',
    address: '',
    filename: null,
  });
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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


      const response = await axios.get('http://localhost:7000/seller/getusers/' + email, { headers });
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
        name: updateData.name,
        email: updateData.email,
        address: updateData.address,
      };

      const profileUpdateResponse = await axios.patch(
        `http://localhost:7000/seller/updateSeller/${email}`,
        profileData,
        { headers }
      );

      if (profileUpdateResponse.status !== 200) {
        throw new Error('Failed to update profile');
      }

      if (updateData.profilePic) {
        const formData = new FormData();
        formData.append('myfile', updateData.profilePic);

        const picUpdateResponse = await axios.put(
          `http://localhost:7000/seller/updatepic/${email}`,
          formData,
          { headers: { ...headers, 'Content-Type': 'multipart/form-data' } }
        );

        if (picUpdateResponse.status !== 200) {
          throw new Error('Failed to update profile picture');
        }
      }

      toast.success('Profile updated successfully!');
      setProfile(updateData);
      toggleEditMode();
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
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

      const response = await axios.delete(`http://localhost:7000/seller/deleteProfile/${email}`, { headers });

      if (response.status === 200) {
        toast.success('Profile deleted successfully!');
        router.push('/signin');
      } else {
        throw new Error('Failed to delete profile');
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <TopBar/>
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
            <ViewProfile profile={profile} toggleEditMode={toggleEditMode} handleDeleteProfile={handleDeleteProfile} successMessage={successMessage} />
          )}
        </div>
        
        </div>
    {!isEditMode && <NavBar/>}
    <Toaster />
    
  </div>
  );
  
};

const ViewProfile = ({ profile, toggleEditMode, handleDeleteProfile, successMessage }: { profile: any, toggleEditMode: () => void, handleDeleteProfile: () => void, successMessage: string | null }) => {
  if (!profile) return null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg p-8 bg-white shadow-md rounded-lg ml-70"> 
        <h1 className="text-2xl font-bold mb-4 text-center">View Profile</h1>
        {successMessage && (
          <div className="mb-4 text-green-600 text-center">{successMessage}</div>
        )}
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 rounded-full overflow-hidden">
            <img alt="Profile Picture" src={'http://localhost:7000/seller/getimage/' + profile.filename} className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="text-center">
          <div>Name: {profile.name}</div>
          <div>Email: {profile.email}</div>
          <div>Address: {profile.address}</div>
          <button onClick={toggleEditMode} className="btn btn-primary mt-4">Edit Profile</button>
        </div>
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
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <label className="block mb-4">
          Name:
          <input
            type="text"
            name="name"
            value={updateData.name}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"

          />
        </label>

        <label className="block mb-4">
          Email:
          <input
            type="email"
            name="email"
            value={updateData.email}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"
            readOnly
          />
        </label>

        <label className="block mb-4">
          Address:
          <input
            type="text"
            name="address"
            value={updateData.address}
            onChange={handleInputChange}
            className="input input-bordered w-full mt-2"

          />
        </label>

        <label className="block mb-4">
          Profile Picture:
          <input
            type="file"
            name="filename"
            onChange={handleFileChange}
            className="input input-bordered w-full mt-2"
          />
        </label>

        <div className="flex justify-between">
          <button type="submit" className="btn bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white font-bold py-2 px-4 rounded"
>Update Profile</button>
          <button onClick={toggleEditMode} className="btn bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </form>
      <button onClick={handleDeleteProfile} className="btn bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-white font-bold py-2 px-4 rounded">Delete Profile</button>
      
    </div>
  );
};

export default Profile;


