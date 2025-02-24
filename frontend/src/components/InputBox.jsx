import React from 'react';

export function InputBox({ label, placeholder, onChange, value, name, type = "text" }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input
        name={name}          // Add this
        value={value}        // Add this
        onChange={onChange}  // Add this
        type={type}         // Add this
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
      />
    </div>
  );
}