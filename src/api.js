import axios from 'axios';

const sendQueryToGemini = async (apiKey, description, image) => {
  const formData = new FormData();
  formData.append('description', description);
  if (image) {
    formData.append('image', image);
  }

  const response = await axios.post('https://api.google.com/gemini/v2/query', formData, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.prompt;
};

const sendQueryToDeepSeek = async (apiKey, description, image) => {
  const formData = new FormData();
  formData.append('description', description);
  if (image) {
    formData.append('image', image);
  }

  const response = await axios.post('https://api.deepseek.com/v3/query', formData, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.prompt;
};

export { sendQueryToGemini, sendQueryToDeepSeek };
