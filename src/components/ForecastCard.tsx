import React from 'react';
import { format } from 'date-fns';
import { Cloud } from 'lucide-react';
import { formatTemperature } from '../utils/temperature';

interface ForecastCardProps {
  date: number;
  temp: number;
  icon: string;
  description: string;
  unit: 'C' | 'F';
}

export function ForecastCard({ date, temp, icon, description, unit }: ForecastCardProps) {
  const getWeatherIcon = (iconCode: string) => 
    `https://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <div className="flex flex-col items-center p-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        {format(date * 1000, 'EEE, MMM d')}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {format(date * 1000, 'h:mm a')}
      </p>
      <img
        src={getWeatherIcon(icon)}
        alt={description}
        className="w-12 h-12 my-2"
      />
      <p className="text-lg font-semibold text-gray-900 dark:text-white">
        {formatTemperature(temp, unit)}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
        {description}
      </p>
    </div>
  );
}