import React, { useState } from 'react';
import { Cloud, AlertCircle } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { ForecastDisplay } from './components/ForecastDisplay';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { getWeather, getForecast } from './utils/api';
import type { WeatherData } from './types/weather';
import type { ForecastData } from './types/forecast';

function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const { theme } = useTheme();

  const handleSearch = async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecast] = await Promise.all([
        getWeather(city),
        getForecast(city)
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center p-4 sm:p-8 bg-cover bg-center bg-no-repeat ${
        theme === 'dark' ? 'bg-black/60' : 'bg-black/40'
      }`}
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80")',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Weather Forecast</h1>
          <p className="text-gray-200">Check the weather anywhere in the world</p>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setUnit('C')}
              className={`px-3 py-1 rounded-md ${
                unit === 'C' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/90 dark:bg-gray-700 text-gray-700 dark:text-white'
              } transition-colors duration-200`}
            >
              °C
            </button>
            <button
              onClick={() => setUnit('F')}
              className={`px-3 py-1 rounded-md ${
                unit === 'F' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/90 dark:bg-gray-700 text-gray-700 dark:text-white'
              } transition-colors duration-200`}
            >
              °F
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {loading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {error && (
            <div className="flex items-center space-x-2 text-red-500 bg-red-50/95 dark:bg-red-900/95 px-4 py-3 rounded-lg backdrop-blur-sm">
              <AlertCircle className="h-5 w-5" />
              <span className="dark:text-red-200">{error}</span>
            </div>
          )}

          {!loading && !error && weatherData && (
            <>
              <WeatherDisplay data={weatherData} unit={unit} />
              {forecastData && <ForecastDisplay data={forecastData} unit={unit} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WeatherApp />
    </ThemeProvider>
  );
}

export default App;