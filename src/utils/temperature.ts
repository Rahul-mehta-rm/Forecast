export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const formatTemperature = (temp: number, unit: 'C' | 'F'): string => {
  const formatted = Math.round(unit === 'F' ? celsiusToFahrenheit(temp) : temp);
  return `${formatted}°${unit}`;
};