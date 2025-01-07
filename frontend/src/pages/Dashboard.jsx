import React, { useState } from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';

const Dashboard = () => {
  // Sample data for users
  const userList = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Alex Johnson', email: 'alex@example.com' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com' },
  ];

  // State for filtered users and search query
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(userList);

  // Filter users based on search query
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter users based on the query
    if (query) {
      const filtered = userList.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(userList); // Reset to original list if search is cleared
    }
  };

  // Sample balance data
  const balance = 15000;

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      {/* Appbar */}
      <Appbar />

      {/* Dashboard Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 space-y-6">
        {/* Balance */}
        <Balance balance={balance} currency="₹" />

        {/* Search Bar */}
        <div className="w-full max-w-xs">
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Users List */}
        <Users users={filteredUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
