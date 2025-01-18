import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import TextBox from './components/TextBox';
import ImageUploader from './components/ImageUploader';
import QueryButton from './components/QueryButton';
import CopyButton from './components/CopyButton';
import { sendQueryToGemini, sendQueryToDeepSeek } from './api';
import './index.css'; // Import the Tailwind CSS file

const App = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    const storedApiKey = localStorage.getItem('apiKey');
    const storedModel = localStorage.getItem('selectedModel');
    if (storedApiKey) setApiKey(storedApiKey);
    if (storedModel) setSelectedModel(storedModel);

    if (storedApiKey && storedModel) {
      console.log('Using stored API key and model:', storedApiKey, storedModel);
    }
  }, []);

  const handleQuery = async () => {
    if (!apiKey || !selectedModel) {
      setShowModal(true);
      return;
    }

    let response;
    if (selectedModel === 'Gemini') {
      response = await sendQueryToGemini(apiKey, description, image);
    } else if (selectedModel === 'DeepSeek') {
      response = await sendQueryToDeepSeek(apiKey, description, image);
    }

    setResponse(response);
  };

  return (
    <div className="app container mx-auto p-4 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Image Prompt Generator</h1>
        
        <TextBox value={description} onChange={setDescription} />
        
        {/* Image and Uploader Container */}
        <div className="flex items-center space-x-4">
          {image && (
            <div className="w-48 h-48 overflow-hidden rounded-lg shadow-lg">
              <img src={URL.createObjectURL(image)} alt="Reference" className="w-full h-full object-cover" />
            </div>
          )}
          <ImageUploader onImageUpload={setImage} />
        </div>
        
        <QueryButton onClick={handleQuery} />
        
        {response && (
          <div className="w-full max-w-2xl mt-6 p-6 bg-white rounded-lg shadow-md">
            <div className="response text-gray-700 whitespace-pre-wrap">{response}</div>
            <div className="mt-4">
              <CopyButton text={response} />
            </div>
          </div>
        )}
        
        {showModal && (
          <Modal
            onClose={() => setShowModal(false)}
            onSave={(key, model) => {
              setApiKey(key);
              setSelectedModel(model);
              localStorage.setItem('apiKey', key);
              localStorage.setItem('selectedModel', model);
              setShowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;