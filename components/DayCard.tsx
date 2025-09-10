import React from 'react';
import { DayPlan } from '../types';
import ActivityCard from './ActivityCard';

interface DayCardProps {
  dayPlan: DayPlan;
  style?: React.CSSProperties;
}

const DayCard: React.FC<DayCardProps> = ({ dayPlan, style }) => {
  return (
    <div className="animate-fadeInUp" style={style}>
        <div className="flex items-baseline space-x-4 mb-6">
            <span className="font-serif text-5xl font-bold text-brand-primary">Day {dayPlan.day}</span>
            <h2 className="text-3xl font-bold text-brand-dark font-serif">{dayPlan.title}</h2>
        </div>
      
        <div className="relative border-l-4 border-teal-100 ml-6 sm:ml-8 pl-8 py-4">
            <p className="text-gray-600 mb-8 max-w-3xl">{dayPlan.summary}</p>
            <div className="space-y-10">
                {dayPlan.activities.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} />
                ))}
            </div>
        </div>
    </div>
  );
};

export default DayCard;