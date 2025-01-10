/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const baseURL = "http://localhost:3000";

    useEffect(() => {
        // Fetch all users when the component mounts
        axios.get(`${baseURL}/api/v1/user/bulks`)
            .then(response => {
                console.log(response.data); // Check response structure
                const fetchedUsers = Array.isArray(response.data.users) ? response.data.users : [];
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers); // Initialize filtered users with the full list of users
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    useEffect(() => {
        // Apply filtering when the filter state changes
        if (filter) {
            const filtered = users.filter(user =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users); // If there's no filter, show all users
        }
    }, [filter, users]); // Dependencies: filter and users

    return (
        <>
            <div className="my-2">
                <label htmlFor="userSearch" className="sr-only">Search users</label>
                <input
                    id="userSearch"
                    onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <User key={user._id} user={user} />
                    ))
                ) : (
                    <p>No users found</p> // Show message when no users match the search
                )}
            </div>
        </>
    );
};

function User({ user }) {
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName ? user.firstName[0] : '?' }
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send Money"} />
            </div>
        </div>
    );
}

export default Users;
*/


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import { useNavigate } from 'react-router-dom'; 

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const baseURL = "http://localhost:3000";
    const navigate = useNavigate(); 

    useEffect(() => {
        // Fetch all users when the component mounts
        axios.get(`${baseURL}/api/v1/user/bulks`)
            .then(response => {
                const fetchedUsers = Array.isArray(response.data.users) ? response.data.users : [];
                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers); // Initialize filtered users with the full list of users
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    useEffect(() => {
        // Apply filtering when the filter state changes
        if (filter) {
            const filtered = users.filter(user =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users); // If there's no filter, show all users
        }
    }, [filter, users]); // Dependencies: filter and users

    return (
        <>
            <div className="my-2">
                <label htmlFor="userSearch" className="sr-only">Search users</label>
                <input
                    id="userSearch"
                    onChange={(e) => setFilter(e.target.value)} // Update filter state on input change
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                />
            </div>
            <div>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <User key={user._id} user={user} navigate={navigate} />
                    ))
                ) : (
                    <p>No users found</p> // Show message when no users match the search
                )}
            </div>
        </>
    );
};

function User({ user, navigate }) {
    const handleSendMoney = () => {
        navigate('/send', { state: { user } }); 
    };

    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName ? user.firstName[0] : '?' }
                    </div>
                </div>
                <div className="flex flex-col justify-center h-full">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <Button label={"Send Money"} onClick={handleSendMoney} />
            </div>
        </div>
    );
}

export default Users;

