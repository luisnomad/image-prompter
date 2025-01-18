import React from 'react';

const CopyButton = ({ text }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <button onClick={copyToClipboard}>
      Copy
    </button>
  );
};

export default CopyButton;
