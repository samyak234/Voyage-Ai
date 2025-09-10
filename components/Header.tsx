
import React from 'react';
import { GlobeIcon } from './icons/Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <GlobeIcon className="h-8 w-8 text-brand-primary" />
            <span className="ml-3 font-serif text-3xl font-bold text-brand-dark">
              VoyageAI
            </span>
          </div>
          <div className="flex items-center space-x-4">
             {/* Future Nav Links can go here */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
