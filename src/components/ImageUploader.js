import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onImageUpload(file);
  };

  return (
    <div className="image-uploader my-4">
      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
      {image && (
        <div className="mt-4">
          <img src={URL.createObjectURL(image)} alt="Reference" className="max-w-full h-auto rounded" />
          <p className="text-gray-600 mt-2">Reference image</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
