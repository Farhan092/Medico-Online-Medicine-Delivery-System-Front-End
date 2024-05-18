import React from 'react';

interface User {
  userName: string;
  email: string;
  address: string;
}

interface Props {
  data: User;
}

const UserCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img src={`http://localhost:3002/admin/getimagebyadminemail/${data.email}`} alt="User Profile" className="w-full h-64 object-cover" />
      <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2 text-black">{data.userName}</div>
        <p className="text-gray-700 text-base">
          <span className="font-semibold text-black">Email:</span> {data.email}
        </p>
        
      </div>
    </div>
  );
};

export default UserCard;
