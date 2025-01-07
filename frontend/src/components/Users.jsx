import React from 'react';

const Users = ({ users = [] }) => {
  return (
    <div className="p-4 space-y-4">
      <div className="text-xl font-semibold text-gray-800 mb-4">User List</div>
      <div className="space-y-2">
        {users.length === 0 ? (
          <div className="text-gray-500">No users found.</div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {/* User Avatar */}
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </div>
              <div>
                <button className="text-blue-600 hover:underline">View</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
