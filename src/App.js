import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import TextBox from './components/TextBox';
import ImageUploader from './components/ImageUploader';
import QueryButton from './components/QueryButton';
import CopyButton from './components/CopyButton';
import { sendQueryToGemini, sendQueryToDeepSeek } from './api';

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
    <div className="app">
      <TextBox value={description} onChange={setDescription} />
      <ImageUploader onImageUpload={setImage} />
      {image && <img src={URL.createObjectURL(image)} alt="Reference" />}
      <QueryButton onClick={handleQuery} />
      {response && (
        <>
          <div className="response">{response}</div>
          <CopyButton text={response} />
        </>
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
  );
};

export default App;
