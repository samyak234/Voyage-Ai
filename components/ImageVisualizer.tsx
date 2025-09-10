import React, { useState } from 'react';

interface ImageVisualizerProps {
  imageUrl: string;
  altText: string;
}

const ImageVisualizer: React.FC<ImageVisualizerProps> = ({ imageUrl, altText }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full h-full aspect-4/3 bg-gray-200 animate-pulse rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none">
      <img
        src={imageUrl}
        alt={altText}
        className={`w-full h-full object-cover transition-opacity duration-500 rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />
    </div>
  );
};

export default ImageVisualizer;
