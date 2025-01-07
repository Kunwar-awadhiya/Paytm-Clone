/*
import React from 'react'

const Appbar = () => {
  return (
    <div className='shadow h-12 flex justify-between'>
        <div className='flex flex-1 justify-center h-full ml-4 '>
            Paytm App
        </div>
        <div className='flex'>
            <div className='flex flex-col justify-center h-full mr-4'>
                hello
            </div>
            <div className='rounded-full h-12 m-12 bg-slate-200 flex justify-center'>
                <div className='flex flex-col justify-center h-full text-center'>
                    U
                </div>

            </div>

        </div>
    </div>
  )
}

export default Appbar;
*/


import React from 'react';

const Appbar = () => {
  return (
    <div className="shadow h-12 flex justify-between items-center bg-white px-4">
      {/* App Name */}
      <div className="text-lg font-semibold text-gray-800">
        Paytm App
      </div>

      {/* User Section */}
      <div className="flex items-center space-x-4">
        {/* Greeting */}
        <div className="text-gray-600">
          Hello
        </div>
        
        {/* User Avatar */}
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center text-gray-800 font-medium">
          U
        </div>
      </div>
    </div>
  );
};

export default Appbar;

