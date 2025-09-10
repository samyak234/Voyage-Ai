export interface UserPreferences {
  destination: string;
  duration: number;
  interests: string[];
  budget: 'budget' | 'moderate' | 'luxury';
}

export type ActivityType = 'Food & Drink' | 'Museum & Art' | 'Outdoor & Nature' | 'Shopping' | 'Entertainment' | 'Landmark' | 'Other';

export interface Activity {
  time: string;
  name: string;
  description: string;
  location: string;
  activityType: ActivityType;
}

export interface DayPlan {
  day: number;
  title: string;
  summary: string;
  activities: Activity[];
}

export interface Itinerary {
  destination: string;
  duration: number;
  tripTitle: string;
  dailyPlans: DayPlan[];
}