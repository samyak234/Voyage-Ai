import React, { useState } from 'react';
import { Itinerary } from '../types';
import DayCard from './DayCard';
import { PlusCircleIcon, ArrowDownTrayIcon } from './icons/Icons';
import { exportItineraryToPDF } from '../utils/pdfExporter';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onCreateNewTrip: () => void;
}

const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary, onCreateNewTrip }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Give a slight delay for the UI to update
      await new Promise(resolve => setTimeout(resolve, 50));
      exportItineraryToPDF(itinerary);
    } catch (error) {
      console.error("Failed to export PDF:", error);
      alert("There was an error creating the PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
      <div className="text-center mb-12">
        <p className="text-base text-brand-primary font-semibold tracking-wide uppercase">{itinerary.destination}</p>
        <h1 className="mt-2 text-4xl font-extrabold text-brand-dark tracking-tight sm:text-5xl font-serif">
          {itinerary.tripTitle}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Your personalized {itinerary.duration}-day adventure awaits.
        </p>
        <div className="mt-8 flex justify-center items-center space-x-4">
          <button
              onClick={onCreateNewTrip}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-full shadow-sm text-brand-primary bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Create a New Trip
          </button>
          <button
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold rounded-full shadow-sm text-white bg-brand-primary hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors disabled:bg-teal-300"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            {isExporting ? 'Exporting...' : 'Export to PDF'}
          </button>
        </div>
      </div>

      <div className="space-y-16">
        {itinerary.dailyPlans.map((plan, index) => (
          <DayCard 
            key={plan.day} 
            dayPlan={plan}
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ItineraryDisplay;