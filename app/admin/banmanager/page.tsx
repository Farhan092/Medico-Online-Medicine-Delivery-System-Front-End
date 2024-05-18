"use client"
import { NextPage } from 'next';
import DeleteManager from '../components/banmanager';

const DeleteManagerPage: NextPage = () => {
  const handleDeletionSuccess = () => {
   
    console.log('Deletion successful!');
  };

  return (
    <div>
      <DeleteManager onDelete={handleDeletionSuccess} />
    </div>
  );
};

export default DeleteManagerPage;
