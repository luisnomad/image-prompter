import React, { useState } from 'react';

const QueryButton = ({ onClick }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? <span className="spinner"></span> : 'Send Query'}
    </button>
  );
};

export default QueryButton;
