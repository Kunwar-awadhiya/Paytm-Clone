import React from "react";

const Button = ({ label, onClick}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 `}
    >
      {label}
    </button>
  );
};

export default Button;
