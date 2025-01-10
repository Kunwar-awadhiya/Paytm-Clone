import React, { useState, useEffect } from 'react';
import Appbar from '../components/Appbar';
import Balance from '../components/Balance';
import Users from '../components/Users';
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const baseURL = 'http://localhost:3000';

  // Fetch balance and users when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!token) {
      console.error('No token found in localStorage');
      return; // Exit if there's no token
    }

    // Fetch user balance with authorization token
    axios
      .get(`${baseURL}/api/v1/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}` // Send the token in the Authorization header
        }
      })
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error('Error fetching balance:', error);
      });

    // Fetch user list with authorization token
    axios
      .get(`${baseURL}/api/v1/user/bulks`, {
        headers: {
          Authorization: `Bearer ${token}` // Send the token in the Authorization header
        }
      })
      .then((response) => {
        setUserList(response.data.users);
        setFilteredUsers(response.data.users); // Initialize filtered users
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, [baseURL]);

  // Filter users based on search query
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const filtered = userList.filter((user) =>
        // Adjust this if user has separate firstName and lastName fields
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(userList);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Appbar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 space-y-6">
        {balance !== null ? (
          <Balance balance={balance} currency="₹" />
        ) : (
          <div>Loading balance...</div>
        )}
        {/* Display filtered users */}
        {filteredUsers.length > 0 ? (
          <Users users={filteredUsers} />
        ) : (
          <div >No users found</div> // Show message when no users match the search
        )}
      </div>
    </div>
  );
};

export default Dashboard;
