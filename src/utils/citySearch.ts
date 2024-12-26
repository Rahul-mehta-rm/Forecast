import axios from 'axios';
import type { City } from '../types/city';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const LIMIT = 10;

export async function searchCities(query: string): Promise<City[]> {
  if (!query.trim()) return [];
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=${LIMIT}&appid=${API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching city suggestions:', error);
    return [];
  }
}