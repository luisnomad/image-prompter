import React from 'react';

const TextBox = ({ value, onChange }) => {
  return (
    <textarea
      className="text-box w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your description here..."
    />
  );
};

export default TextBox;
