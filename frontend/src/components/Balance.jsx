import React from 'react';

const Balance = ({ balance = 0, currency = '₹' }) => {
  return (
    <div className="shadow-md bg-white p-4 rounded-lg w-64 mx-auto text-center">
      <div className="text-lg font-semibold text-gray-800">Your Balance</div>
      <div className="text-2xl font-bold text-green-600 mt-2">
        {currency}{balance.toLocaleString()}
      </div>
    </div>
  );
};

export default Balance;
