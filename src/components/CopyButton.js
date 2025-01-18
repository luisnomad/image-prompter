import React from 'react';

const CopyButton = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      // alert('Copied to clipboard!');
    });
  };

  return (
    <button onClick={copyToClipboard} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Copy
    </button>
  );
};

export default CopyButton;
