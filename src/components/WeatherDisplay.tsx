import React from 'react';
import { format } from 'date-fns';
import { Thermometer, Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { formatTemperature } from '../utils/temperature';

interface WeatherDisplayProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, unit }) => {
  const getWeatherIcon = (iconCode: string) => 
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="w-full max-w-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6 transition-all duration-300">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{data.name}</h2>
        <div className="flex items-center justify-center mt-4">
          <img
            src={getWeatherIcon(data.weather[0].icon)}
            alt={data.weather[0].description}
            className="w-20 h-20"
          />
          <div className="text-5xl font-bold text-gray-900 dark:text-white">
            {formatTemperature(data.main.temp, unit)}
          </div>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 capitalize">{data.weather[0].description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Feels like</p>
            <p className="font-semibold dark:text-white">{formatTemperature(data.main.feels_like, unit)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-semibold dark:text-white">{data.main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="font-semibold dark:text-white">{Math.round(data.wind.speed * 3.6)} km/h</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Thermometer className="text-blue-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Min/Max</p>
            <p className="font-semibold dark:text-white">
              {formatTemperature(data.main.temp_min, unit)} / {formatTemperature(data.main.temp_max, unit)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Sunrise className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise</p>
            <p className="font-semibold dark:text-white">
              {format(data.sys.sunrise * 1000, 'HH:mm')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Sunset className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sunset</p>
            <p className="font-semibold dark:text-white">
              {format(data.sys.sunset * 1000, 'HH:mm')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};