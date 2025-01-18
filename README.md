# image-prompter
Small application to create text2image or text2video prompts

## Requirements
- Node.js 
- npm
- A valid API key for either Google Gemini or DeepSeek

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/image-prompter.git
cd image-prompter
```

## Detailed Description
The image-prompter application allows users to create text-to-image or text-to-video prompts. Users can input a description and optionally upload an image as a reference. The app supports two models: Google Gemini API and DeepSeek v3. Users can select the model and enter the API key through a modal. The app stores the API key and selected model in local storage. The app displays the generated prompt and allows users to copy it to the clipboard. The app uses components like `TextBox`, `ImageUploader`, `QueryButton`, `CopyButton`, and `Modal`. The app makes API requests using functions from `src/api.js`.

## Instructions on How to Use the App

### Inputting Descriptions
1. Open the application.
2. In the text box provided, enter a description of the image or video you want to generate.

### Uploading Images
1. Click on the "Upload Image" button.
2. Select an image file from your computer to use as a reference.
3. The selected image will be displayed as a reference.

### Selecting Models
1. Click on the "Select Model" button.
2. A modal will appear with options to select either the Google Gemini API or DeepSeek v3.
3. Choose the desired model from the dropdown menu.

### Entering API Keys
1. In the same modal where you select the model, there will be a field to enter the API key.
2. Enter the API key for the selected model.
3. Click "Save" to store the API key and selected model in local storage.

### Copying Prompts
1. After generating a prompt, the prompt will be displayed on the screen.
2. Click on the "Copy" button to copy the generated prompt to the clipboard.
3. You can now paste the prompt wherever you need it.

## Components Used
- `TextBox`: A component for inputting descriptions.
- `ImageUploader`: A component for uploading reference images.
- `QueryButton`: A button to send the query to the selected model.
- `CopyButton`: A button to copy the generated prompt to the clipboard.
- `Modal`: A modal for selecting the model and entering the API key.

## API Requests
The app makes API requests using functions from `src/api.js`. The functions `sendQueryToGemini` and `sendQueryToDeepSeek` handle the requests to the Google Gemini API and DeepSeek v3, respectively.
