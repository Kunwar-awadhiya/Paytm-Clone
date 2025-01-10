import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SendMoney = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = location.state || {}; // Get user data from the state passed
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Assuming the backend API URL
    const baseURL = 'http://localhost:3000';

    // Handle money transfer
    const handleTransfer = async () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            setError("Please enter a valid amount");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Sending transfer request to the backend
            const response = await axios.post(
                `${baseURL}/api/v1/account/transfer`,
                { amount, to: user._id }, // Send the amount and recipient's userId
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure the token is sent for authentication
                    }
                }
            );

            // If transfer is successful, show success message
            setSuccess(true);
            setLoading(false);
            setAmount(''); // Reset the amount field
            setTimeout(() => navigate('/dashboard'), 2000); // Redirect to dashboard after success
        } catch (err) {
            // Handle errors during transfer
            setLoading(false);
            setError(err.response?.data?.message || "An error occurred during the transaction");
        }
    };

    return (
        <div className="p-6">
            <h2>Send Money to {user ? `${user.firstName} ${user.lastName}` : "User"}</h2>
            <div className="my-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                </label>
                <input
                    id="amount"
                    type="number"
                    min="1"
                    placeholder="Enter amount to transfer"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {success && <div className="text-green-500 text-sm mb-4">Transfer successful!</div>}

            <button
                onClick={handleTransfer}
                className="mt-4 w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Processing..." : "Send Money"}
            </button>
        </div>
    );
};

export default SendMoney;
