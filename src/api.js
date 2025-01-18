import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Helper function to generate a detailed prompt for the model
const generateQueryPrompt = (description, image) => {
  let prompt = `You are an AI assistant designed to help users create high-quality text-to-image or text-to-video prompts. 
The user has provided the following description: "${description}". 

Your task is to generate a SINGLE, detailed, and creative prompt that can be used to generate an image or video based on the description. 

**Instructions:**
1. Provide ONLY ONE prompt option.
2. Be concise and avoid unnecessary explanations.
3. Focus on creating a detailed and visually rich prompt.
4. Do not include additional commentary, explanations, or considerations.`;

  if (image) {
    prompt += ` The user has also provided an image as a reference. Use the image to enhance the prompt and ensure the generated output aligns with the visual style and content of the image.`;
  }

  return prompt;
};

const sendQueryToGemini = async (apiKey, description, image) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp"
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
    };

    // Generate the detailed prompt
    const prompt = generateQueryPrompt(description, image);

    let promptParts = [{ text: prompt }];
    if (image) {
      // Convert File object to GenerativePart
      const imageData = await fileToGenerativePart(image);
      promptParts.push(imageData);
    }

    const result = await model.generateContent({
      contents: [{ role: "user", parts: promptParts }],
      generationConfig,
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to process query with Gemini');
  }
};

// Helper function to convert File to GenerativePart
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type
    }
  };
}

const sendQueryToDeepSeek = async (apiKey, description, image) => {
  const prompt = generateQueryPrompt(description, image);

  const formData = new FormData();
  formData.append('description', prompt);
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