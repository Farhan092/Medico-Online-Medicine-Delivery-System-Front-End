// 'use client';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Bottombar from '../components/bottombar';
// import Topbar from '../components/topbar';

// const Profile = () => {
//   const router = useRouter();
//   const [profile, setProfile] = useState<any>(null);
//   const [updateData, setUpdateData] = useState<any>({
//     name: '',
//     email: '',
//     address: '',
//     filename: null,
//   });
//   const [isEditMode, setIsEditMode] = useState<boolean>(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get('http://localhost:5000/customer/getuser/'+email, { headers });
//       setProfile(response.data);
//       setUpdateData(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setUpdateData((prevData: any) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       setUpdateData((prevData: any) => ({ ...prevData, profilePic: file }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const profileData = {
//         name: updateData.name,
//         email: updateData.email,
//         address: updateData.address,
//       };

//       const profileUpdateResponse = await axios.patch(
//         `http://localhost:5000/customer/updateCustomer/${email}`,
//         profileData,
//         { headers }
//       );

//       if (profileUpdateResponse.status !== 200) {
//         throw new Error('Failed to update profile');
//       }

//       if (updateData.profilePic) {
//         const formData = new FormData();
//         formData.append('myfile', updateData.profilePic);

//         const picUpdateResponse = await axios.put(
//           `http://localhost:5000/customer/updatepic/${email}`,
//           formData,
//           { headers: { ...headers, 'Content-Type': 'multipart/form-data' } }
//         );

//         if (picUpdateResponse.status !== 200) {
//           throw new Error('Failed to update profile picture');
//         }
//       }

//       alert('Profile updated successfully!');
//       setProfile(updateData);
//       toggleEditMode();
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile. Please try again.');
//     }
//   };

//   const toggleEditMode = () => {
//     setIsEditMode(prev => !prev);
//   };

//   const handleDeleteProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.delete(`http://localhost:5000/customer/deleteProfile/${email}`, { headers });

//       if (response) {
//         alert('Profile deleted successfully!');
//         router.push('/signin'); 
//       } else {
//         throw new Error('Failed to delete profile');
//       }
//     } catch (error) {
//       console.error('Error deleting profile:', error);
//       alert('Failed to delete profile. Please try again.');
//     }
//   };

//   return (<>
//   <Topbar/>
//     <div className="container mx-auto">
//       <div className="grid grid-cols-2 gap-8">
//         <div>
//           {isEditMode ? (
//             <EditProfile 
//               updateData={updateData}
//               handleInputChange={handleInputChange}
//               handleFileChange={handleFileChange}
//               handleSubmit={handleSubmit}
//               toggleEditMode={toggleEditMode}
//               handleDeleteProfile={handleDeleteProfile}
//             />
//           ) : (
//             <ViewProfile profile={profile} toggleEditMode={toggleEditMode} handleDeleteProfile={handleDeleteProfile} />
//           )}
//         </div>
//       </div>
//     </div>
//     <Bottombar/>
//   </>);
// };

// const ViewProfile = ({ profile, toggleEditMode, handleDeleteProfile }: { profile: any, toggleEditMode: () => void, handleDeleteProfile: () => void }) => {
//   if (!profile) return null;

//   return (
//     <div>
//       <div>

        
      



        
        
//         <h1 className="text-2xl font-bold mb-4">View Profile</h1>

//         <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//           <div className="w-20 rounded-full">
//             <img alt="Tailwind CSS Navbar component" src={'http://localhost:5000/customer/getimage/'+profile.filename} />
//           </div>
//         </div>
        
//         <div>Name: {profile.name}</div>
//         <div>Email: {profile.email}</div>
//         <div>Address: {profile.address}</div>
//         <button onClick={toggleEditMode} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Edit Profile</button>

//       </div>
//     </div>
//   );
// };

// const EditProfile = ({ updateData, handleInputChange, handleFileChange, handleSubmit, toggleEditMode, handleDeleteProfile }: { 
//   updateData: any,
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
//   handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
//   toggleEditMode: () => void,
//   handleDeleteProfile: () => void
// }) => {
//   return (<>
//     <Topbar/>
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
//       <form onSubmit={handleSubmit} className="max-w-md">
//         <label className="block mb-4">
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={updateData.name}
//             onChange={handleInputChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//             required
//           />
//         </label>

//         <label className="block mb-4">
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={updateData.email}
//             onChange={handleInputChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//             required
//             readOnly
//           />
//         </label>

//         <label className="block mb-4">
//           Address:
//           <input
//             type="text"
//             name="address"
//             value={updateData.address}
//             onChange={handleInputChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//             required
//           />
//         </label>

//         <label className="block mb-4">
//           Profile Picture:
//           <input
//             type="file"
//             name="filename"
//             onChange={handleFileChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//           />
//         </label>

//         <div className="flex justify-between">
//           <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Update Profile</button>
//           <button onClick={toggleEditMode} className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded">Cancel</button>
//         </div>
//       </form>
//       <button onClick={handleDeleteProfile} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mt-4">Delete Profile</button>
//     </div>
//     <Bottombar/>
//   </>);
// };

// export default Profile;
//special
// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import Bottombar from '../components/bottombar';
// import Topbar from '../components/topbar';

// const Profile = () => {
//   const router = useRouter();
//   const [profile, setProfile] = useState<any>(null);
//   const [updateData, setUpdateData] = useState<any>({
//     name: '',
//     email: '',
//     address: '',
//     filename: null,
//   });
//   const [isEditMode, setIsEditMode] = useState<boolean>(false);

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get('http://localhost:5000/customer/getuser/'+email, { headers });
//       setProfile(response.data);
//       setUpdateData(response.data);
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setUpdateData((prevData: any) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) {
//       setUpdateData((prevData: any) => ({ ...prevData, profilePic: file }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const profileData = {
//         name: updateData.name,
//         email: updateData.email,
//         address: updateData.address,
//       };

//       const profileUpdateResponse = await axios.patch(
//         `http://localhost:5000/customer/updateCustomer/${email}`,
//         profileData,
//         { headers }
//       );

//       if (profileUpdateResponse.status !== 200) {
//         throw new Error('Failed to update profile');
//       }

//       if (updateData.profilePic) {
//         const formData = new FormData();
//         formData.append('myfile', updateData.profilePic);

//         const picUpdateResponse = await axios.put(
//           `http://localhost:5000/customer/updatepic/${email}`,
//           formData,
//           { headers: { ...headers, 'Content-Type': 'multipart/form-data' } }
//         );

//         if (picUpdateResponse.status !== 200) {
//           throw new Error('Failed to update profile picture');
//         }
//       }

//       alert('Profile updated successfully!');
//       setProfile(updateData);
//       toggleEditMode();
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile. Please try again.');
//     }
//   };

//   const toggleEditMode = () => {
//     setIsEditMode(prev => !prev);
//   };

//   const handleDeleteProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const email = localStorage.getItem('email');

//       if (!token) {
//         throw new Error('Token not found in localStorage');
//       }

//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.delete(`http://localhost:5000/customer/deleteProfile/${email}`, { headers });

//       if (response) {
//         alert('Profile deleted successfully!');
//         router.push('/signin'); 
//       } else {
//         throw new Error('Failed to delete profile');
//       }
//     } catch (error) {
//       console.error('Error deleting profile:', error);
//       alert('Failed to delete profile. Please try again.');
//     }
//   };

//   return (
//     <>
//       <Topbar />
//       <div className="container mx-auto mt-8">
//         <div className="grid grid-cols-2 gap-8">
//           <div>
//             {isEditMode ? (
//               <EditProfile
//                 updateData={updateData}
//                 handleInputChange={handleInputChange}
//                 handleFileChange={handleFileChange}
//                 handleSubmit={handleSubmit}
//                 toggleEditMode={toggleEditMode}
//                 handleDeleteProfile={handleDeleteProfile}
//               />
//             ) : (
//               <ViewProfile profile={profile} toggleEditMode={toggleEditMode} handleDeleteProfile={handleDeleteProfile} />
//             )}
//           </div>
//         </div>
//       </div>
//       <Bottombar />
//     </>
//   );
// };

// const ViewProfile = ({ profile, toggleEditMode, handleDeleteProfile }: { profile: any, toggleEditMode: () => void, handleDeleteProfile: () => void }) => {
//   if (!profile) return null;

//   return (
//     <div className="text-center">
//       <h1 className="text-2xl font-bold mb-4">Profile</h1>

//       <div className="btn btn-ghost btn-circle avatar mx-auto mb-4">
//         <div className="w-20 rounded-full">
//           <img alt="Profile" src={'http://localhost:5000/customer/getimage/'+profile.filename} />
//         </div>
//       </div>

//       <div>Name: {profile.name}</div>
//       <div>Email: {profile.email}</div>
//       <div>Address: {profile.address}</div>

//       <button onClick={toggleEditMode} className="bg-green-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4">Update Profile</button>
//     </div>
//   );
// };

// const EditProfile = ({ updateData, handleInputChange, handleFileChange, handleSubmit, toggleEditMode, handleDeleteProfile }: { 
//   updateData: any,
//   handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
//   handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
//   toggleEditMode: () => void,
//   handleDeleteProfile: () => void
// }) => {
//   return (
//     <div className="text-center">
//       <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
//       <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//         <label className="block mb-4">
//           Name:
//           <input
//             type="text"
//             name="name"
//             value={updateData.name}
//             onChange={handleInputChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//             required
//           />
//         </label>

//         <label className="block mb-4">
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={updateData.email}
//             onChange={handleInputChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//             required
//             readOnly
//           />
//         </label>

//         <label className="block mb-4">
//           Address:
//           <input
//             type="text"
//             name="address"
//             value={updateData.address}
//             onChange={handleInputChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//             required
//           />
//         </label>

//         <label className="block mb-4">
//           Profile Picture:
//           <input
//             type="file"
//             name="filename"
//             onChange={handleFileChange}
//             className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
//           />
//         </label>

//         <div className="flex justify-between">
//           <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Update Profile</button>
//           <button onClick={toggleEditMode} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">Cancel</button>
//         </div>
//       </form>
//       <button onClick={handleDeleteProfile} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4">Delete Profile</button>
//     </div>
//   );
// };

// export default Profile;
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Bottombar from '../components/bottombar';
import Topbar from '../components/topbar';

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
  const [validationErrors, setValidationErrors] = useState<any>({});

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

      const response = await axios.get('http://localhost:5000/customer/getuser/'+email, { headers });
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

      const isValid = validateInputs();
      if (!isValid) {
        toast.error("Please fill in all required fields.");
        return;
      }

      const profileData = {
        name: updateData.name,
        email: updateData.email,
        address: updateData.address,
      };

      const profileUpdateResponse = await axios.patch(
        `http://localhost:5000/customer/updateCustomer/${email}`,
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
          `http://localhost:5000/customer/updatepic/${email}`,
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
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
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

      const response = await axios.delete(`http://localhost:5000/customer/deleteProfile/${email}`, { headers });

      if (response) {
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

  const validateInputs = () => {
    const errors: any = {};

    if (!updateData.name) {
      errors.name = "Name is required";
    }
    if (!updateData.email) {
      errors.email = "Email is required";
    }
    if (!updateData.address) {
      errors.address = "Address is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <Topbar />
      <div className="container mx-auto mt-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            {isEditMode ? (
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <label className="block mb-4">
                    Name:
                    <input
                      type="text"
                      name="name"
                      value={updateData.name}
                      onChange={handleInputChange}
                      className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
                      
                    />
                    {validationErrors.name && <span className="text-red-500">{validationErrors.name}</span>}
                  </label>

                  <label className="block mb-4">
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={updateData.email}
                      onChange={handleInputChange}
                      className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
                      
                      readOnly
                    />
                    {validationErrors.email && <span className="text-red-500">{validationErrors.email}</span>}
                  </label>

                  <label className="block mb-4">
                    Address:
                    <input
                      type="text"
                      name="address"
                      value={updateData.address}
                      onChange={handleInputChange}
                      className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
                      
                    />
                    {validationErrors.address && <span className="text-red-500">{validationErrors.address}</span>}
                  </label>

                  <label className="block mb-4">
                    Profile Picture:
                    <input
                      type="file"
                      name="filename"
                      onChange={handleFileChange}
                      className="block border border-gray-300 rounded-md px-4 py-2 mt-2 w-full"
                    />
                  </label>

                  <div className="flex justify-between">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Update Profile</button>
                    <button onClick={toggleEditMode} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">Cancel</button>
                  </div>
                </form>
                <button onClick={handleDeleteProfile} className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4">Delete Profile</button>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Profile</h1>

                <div className="btn btn-ghost btn-circle avatar mx-auto mb-4">
                  <div className="w-20 rounded-full">
                    <img alt="Profile" src={'http://localhost:5000/customer/getimage/'+(profile && profile.filename)} />
                  </div>
                </div>

                <div>Name: {(profile && profile.name)}</div>
                <div>Email: {(profile && profile.email)}</div>
                <div>Address: {(profile && profile.address)}</div>

                <button onClick={toggleEditMode} className="bg-green-600 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4">Update Profile</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Bottombar />
      <Toaster />
    </>
  );
};

export default Profile;


