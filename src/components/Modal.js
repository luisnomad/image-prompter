import React, { useState } from 'react';

const Modal = ({ onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const handleSave = () => {
    onSave(apiKey, selectedModel);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Select LLM and Enter API Key</h2>
        <div>
          <label>
            API Key:
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Select Model:
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Gemini">Google Gemini API</option>
              <option value="DeepSeek">DeepSeek v3</option>
            </select>
          </label>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default Modal;
