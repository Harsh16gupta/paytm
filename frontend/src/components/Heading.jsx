import React from 'react'; // Add this to other files like Signin.jsx

export function Heading({label}) {
    return <div className="font-bold text-4xl pt-6">
      {label}
    </div>
}