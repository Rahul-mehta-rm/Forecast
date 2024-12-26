import React from 'react';
import { ForecastCard } from './ForecastCard';
import type { ForecastData } from '../types/forecast';

interface ForecastDisplayProps {
  data: ForecastData;
  unit: 'C' | 'F';
}

export function ForecastDisplay({ data, unit }: ForecastDisplayProps) {
  // Get one forecast per day at the same time
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000);
    const dateKey = date.toDateString();
    
    if (!acc[dateKey] && acc.size < 5) {
      acc[dateKey] = forecast;
    }
    
    return acc;
  }, new Map());

  return (
    <div className="mt-8 w-full">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        5-Day Forecast
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from(dailyForecasts.values()).map((forecast) => (
          <ForecastCard
            key={forecast.dt}
            date={forecast.dt}
            temp={forecast.main.temp}
            icon={forecast.weather[0].icon}
            description={forecast.weather[0].description}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}