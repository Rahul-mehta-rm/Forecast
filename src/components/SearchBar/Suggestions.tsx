import React from 'react';
import type { City } from '../../types/city';

interface SuggestionsProps {
  suggestions: City[];
  selectedIndex: number;
  onSelect: (city: City) => void;
  visible: boolean;
}

export function Suggestions({ suggestions, selectedIndex, onSelect, visible }: SuggestionsProps) {
  if (!visible || suggestions.length === 0) return null;

  return (
    <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
      {suggestions.map((city, index) => (
        <li
          key={`${city.name}-${city.lat}-${city.lon}`}
          className={`px-4 py-2 cursor-pointer ${
            index === selectedIndex
              ? 'bg-blue-50 dark:bg-blue-900'
              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
          onClick={() => onSelect(city)}
        >
          <div className="text-gray-900 dark:text-white">
            {city.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {city.state ? `${city.state}, ` : ''}{city.country}
          </div>
        </li>
      ))}
    </ul>
  );
}