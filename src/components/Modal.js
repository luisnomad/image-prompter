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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <span className="absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={onClose}>&times;</span>
        <h2 className="text-xl font-bold mb-4">Select LLM and Enter API Key</h2>
        <div className="mb-4">
          <label className="block text-gray-700">
            API Key:
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={!!process.env.REACT_APP_GEMINI_API_KEY || !!process.env.REACT_APP_DEEPSEEK_API_KEY}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Select Model:
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select</option>
              <option value="Gemini">Google Gemini API</option>
              <option value="DeepSeek">DeepSeek v3</option>
            </select>
          </label>
        </div>
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </div>
  );
};

export default Modal;
