import React from 'react'; // Add this to other files like Signin.jsx

export function SubHeading({label}) {
    return <div className="text-slate-500 text-md pt-1 px-4 pb-4">
      {label}
    </div>
  }