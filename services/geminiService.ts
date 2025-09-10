import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, Itinerary } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    destination: { type: Type.STRING },
    duration: { type: Type.INTEGER },
    tripTitle: {
      type: Type.STRING,
      description: "A creative and catchy title for the trip based on user preferences."
    },
    dailyPlans: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          title: { type: Type.STRING, description: "A short, engaging title for the day's theme." },
          summary: { type: Type.STRING, description: "A one-paragraph summary of the day's activities." },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "E.g., '9:00 AM - 11:00 AM' or 'Evening'" },
                name: { type: Type.STRING, description: "Name of the place or activity." },
                description: { type: Type.STRING, description: "A detailed, engaging description of the activity." },
                location: { type: Type.STRING, description: "Neighborhood or specific address." },
                activityType: {
                  type: Type.STRING,
                  description: "Categorize the activity. Must be one of: 'Food & Drink', 'Museum & Art', 'Outdoor & Nature', 'Shopping', 'Entertainment', 'Landmark', 'Other'.",
                  enum: ['Food & Drink', 'Museum & Art', 'Outdoor & Nature', 'Shopping', 'Entertainment', 'Landmark', 'Other']
                },
              },
              required: ["time", "name", "description", "location", "activityType"]
            }
          }
        },
        required: ["day", "title", "summary", "activities"]
      }
    }
  },
  required: ["destination", "duration", "tripTitle", "dailyPlans"]
};

export const generateItinerary = async (preferences: UserPreferences): Promise<Itinerary> => {
  const prompt = `
    You are VoyageAI, an expert travel planner. Create a detailed, day-by-day travel itinerary based on the user's preferences.
    
    User Preferences:
    - Destination: ${preferences.destination}
    - Duration: ${preferences.duration} days
    - Interests: ${preferences.interests.join(', ')}
    - Budget: ${preferences.budget}

    Instructions:
    1.  Craft a logical and enjoyable itinerary, mixing popular attractions with hidden gems.
    2.  For each activity, provide a detailed description, location, and categorize it by selecting the most appropriate 'activityType'.
    3.  Ensure the response is a valid JSON object adhering to the provided schema. Do not include any text before or after the JSON object.
    `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: itinerarySchema,
      },
    });

    const jsonText = response.text.trim();
    // In rare cases, the model might wrap the JSON in markdown backticks.
    const cleanedJson = jsonText.replace(/^```json\s*|```$/g, '');
    return JSON.parse(cleanedJson) as Itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary from AI.");
  }
};