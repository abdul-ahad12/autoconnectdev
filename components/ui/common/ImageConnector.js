import React, { useState } from "react";

const ImageConnector = () => {
  const [activeImage, setActiveImage] = useState(null);

  const handleImageClick = (imageNumber) => {
    setActiveImage(imageNumber);
  };

  const isActive = (imageNumber) => {
    return activeImage !== null && activeImage >= imageNumber;
  };

  return (
    <div className="flex items-center gap-10 mt-4 w-full">
      <div
        className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 z-50 ${
          isActive(1) ? "border-orange-500 border-2" : ""
        }`}
        onClick={() => handleImageClick(1)}
      >
        {/* Image 1 */}
        <span
          className={`absolute -right-10 h-0.5 w-10 bg-gray-300 ${
            activeImage >= 2 ? "bg-gray-600" : "bg-gray-400"
          }`}
        ></span>
      </div>
      <div
        className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 z-50 ${
          isActive(2) ? "border-orange-500 border-2" : ""
        }`}
        onClick={() => handleImageClick(2)}
      >
        {/* Image 2 */}
        <span
          className={`absolute -right-10 h-0.5 w-10 bg-gray-300 ${
            activeImage >= 3 ? "bg-gray-500" : ""
          }`}
        ></span>
      </div>
      <div
        className={`relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 z-50 ${
          isActive(3) ? "border-orange-500 border-2" : ""
        }`}
        onClick={() => handleImageClick(3)}
      >
        {/* Image 3 */}
      </div>
    </div>
  );
};

export default ImageConnector;
