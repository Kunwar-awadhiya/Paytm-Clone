import React, { useState } from 'react';
import Button from '../components/Button';
import InputBox from '../components/InputBox';
import { useNavigate } from 'react-router-dom';

const SendMoney = () => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!recipient || !amount) {
      setError('Please fill in all fields.');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    // Simulate sending money (You can integrate actual API calls here)
    alert(`Money sent to ${recipient} for ₹${amount}`);
    setError('');
    
    // Navigate to the Dashboard after sending money
    navigate('/dashboard');
  };

  return (
    <div className="bg-slate-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md w-96 p-6">
        <div className="text-2xl font-semibold text-center text-gray-800 mb-4">Send Money</div>
        
        {/* Error Message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        {/* Recipient's Email Input */}
        <InputBox 
          label="Recipient Email" 
          placeholder="example@example.com" 
          value={recipient} 
          onChange={(e) => setRecipient(e.target.value)} 
        />
        
        {/* Amount Input */}
        <InputBox 
          label="Amount" 
          placeholder="Enter amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />

        {/* Send Button */}
        <div className="mt-4 text-center">
          <Button text="Send Money" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
