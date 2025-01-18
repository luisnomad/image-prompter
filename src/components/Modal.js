import React, { useState, useEffect } from 'react';

const Modal = ({ onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    const envGeminiApiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
    const envDeepSeekApiKey = process.env.REACT_APP_DEEPSEEK_API_KEY || '';
    if (envGeminiApiKey && selectedModel === 'Gemini') {
      setApiKey(envGeminiApiKey);
    } else if (envDeepSeekApiKey && selectedModel === 'DeepSeek') {
      setApiKey(envDeepSeekApiKey);
    }
  }, [selectedModel]);

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
              disabled={!!process.env.REACT_APP_GEMINI_API_KEY || !!process.env.REACT_APP_DEEPSEEK_API_KEY}
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