import React from 'react';
import { Activity, ActivityType } from '../types';
import { ClockIcon, LocationMarkerIcon, FoodIcon, MuseumIcon, NatureIcon, ShoppingIcon, EntertainmentIcon, LandmarkIcon } from './icons/Icons';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityIcon: React.FC<{ type: ActivityType }> = ({ type }) => {
  const iconMap: Record<ActivityType, React.ReactNode> = {
    'Food & Drink': <FoodIcon className="h-6 w-6 text-white" />,
    'Museum & Art': <MuseumIcon className="h-6 w-6 text-white" />,
    'Outdoor & Nature': <NatureIcon className="h-6 w-6 text-white" />,
    'Shopping': <ShoppingIcon className="h-6 w-6 text-white" />,
    'Entertainment': <EntertainmentIcon className="h-6 w-6 text-white" />,
    'Landmark': <LandmarkIcon className="h-6 w-6 text-white" />,
    'Other': <LocationMarkerIcon className="h-6 w-6 text-white" />,
  };
  return iconMap[type] || iconMap['Other'];
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="relative">
      {/* Timeline Dot and Icon */}
      <div className="absolute -left-12 top-0 h-10 w-10 bg-brand-primary rounded-full flex items-center justify-center ring-8 ring-white">
        <ActivityIcon type={activity.activityType} />
      </div>

      <div className="ml-4 bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-3 mb-2">
          <ClockIcon className="h-5 w-5 text-brand-primary" />
          <p className="font-semibold text-brand-primary">{activity.time}</p>
        </div>
        <h3 className="text-xl font-bold text-brand-dark">{activity.name}</h3>
        <p className="mt-2 text-gray-600">{activity.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-start space-x-3">
            <LocationMarkerIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-500">{activity.location}</p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;