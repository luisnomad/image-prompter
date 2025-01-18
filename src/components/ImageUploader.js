import React, { useState } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    onImageUpload(file);
  };

  return (
    <div className="image-uploader">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <img src={URL.createObjectURL(image)} alt="Reference" />
          <p>Reference image</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
