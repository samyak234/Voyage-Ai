import React, { useState, useCallback, useEffect } from 'react';
import { Itinerary, UserPreferences } from './types';
import { generateItinerary } from './services/geminiService';
import PlannerForm from './components/PlannerForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'form' | 'itinerary'>('form');

  useEffect(() => {
    // Attempt to load saved itinerary from localStorage on initial render
    try {
      const savedItinerary = localStorage.getItem('voyageAI-itinerary');
      if (savedItinerary) {
        setItinerary(JSON.parse(savedItinerary));
        setView('itinerary');
      }
    } catch (e) {
      console.error("Failed to parse from localStorage", e);
      localStorage.removeItem('voyageAI-itinerary');
    }
  }, []);

  const handlePlanTrip = useCallback(async (preferences: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setView('form');

    try {
      const generatedItinerary = await generateItinerary(preferences);
      setItinerary(generatedItinerary);
      setView('itinerary');
      localStorage.setItem('voyageAI-itinerary', JSON.stringify(generatedItinerary));
    } catch (err) {
      console.error(err);
      setError('Oops! Something went wrong while planning your trip. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreateNewTrip = () => {
    setItinerary(null);
    setView('form');
    setError(null);
    localStorage.removeItem('voyageAI-itinerary');
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gradient-to-br from-white to-gray-50 text-brand-dark">
      <Header />
      <main className="flex-grow">
        {isLoading && <LoadingScreen />}
        {!isLoading && (
          <>
            {view === 'form' && !itinerary && (
              <>
                <Hero />
                <PlannerForm onPlanTrip={handlePlanTrip} error={error} />
              </>
            )}
            {view === 'itinerary' && itinerary && (
              <ItineraryDisplay 
                itinerary={itinerary} 
                onCreateNewTrip={handleCreateNewTrip} 
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;