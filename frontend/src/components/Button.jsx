import React from 'react';

export function Button({ label, onClick, type = "button", className = "" }) {
  return (
    <button
      onClick={onClick}
      type={type}  // Allows for form submission when needed
      className={`w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 
        focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ${className}`}
      aria-label={label}  // Improves accessibility
    >
      {label}
    </button>
  );
}