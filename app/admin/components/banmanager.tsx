import React, { useState } from 'react';
import axios from 'axios';

interface DeleteManagerProps {
  onDelete: () => void;
}

const DeleteManager: React.FC<DeleteManagerProps> = ({ onDelete }) => {
  const [managerId, setManagerId] = useState<string>('');

  const handleDeleteManager = async () => {
    try {
      const response = await axios.delete(`http://localhost:3002/admin/deletemanager/${managerId}`);
      console.log('Manager deleted successfully:', response.data);
      setManagerId('');
      onDelete(); // Notify parent component that deletion was successful
    } catch (error) {
      console.error('Error deleting manager:', error);
    }
  };

  return (
    <div>
      <h2>Delete Manager</h2>
      <div>
        <input
          type="number"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
          placeholder="Manager ID"
        />
        <button onClick={handleDeleteManager}>Delete Manager</button>
      </div>
    </div>
  );
};

export default DeleteManager;
