import React, { useRef, useState } from "react";

const ImageUpload = () => {
  const [imageSrc, setImageSrc] = useState("default-image.jpg");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <img
        id="image"
        src={imageSrc}
        alt="Click to upload"
        onClick={handleImageClick}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          cursor: "pointer",
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageUpload;
