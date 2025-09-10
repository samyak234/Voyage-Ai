
import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Consulting our world travel experts...",
  "Generating dream-like visuals of your trip...",
  "Finding hidden gems just for you...",
  "Packing your virtual bags...",
  "Polishing your personalized itinerary...",
  "Mapping out your adventure...",
  "Cross-referencing global cuisines...",
];

const LoadingScreen: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-brand-light bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      <h2 className="mt-8 text-2xl font-semibold text-brand-dark">Crafting Your Adventure</h2>
      <p className="mt-2 text-gray-600 transition-opacity duration-500">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default LoadingScreen;
