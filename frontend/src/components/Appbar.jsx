import React from 'react';

const Appbar = () => {
  return (
    <div className="shadow h-12 flex justify-between items-center bg-white px-4">
      <div className="text-lg font-semibold text-gray-800">
        Paytm App
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-gray-600">
          Hello
        </div>
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center text-gray-800 font-medium">
          U
        </div>
      </div>
    </div>
  );
};

export default Appbar;

