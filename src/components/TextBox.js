import React from 'react';

const TextBox = ({ value, onChange }) => {
  return (
    <textarea
      className="text-box"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your description here..."
    />
  );
};

export default TextBox;
