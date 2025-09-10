
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-light mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} VoyageAI. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">Your smart itinerary planner, powered by AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
