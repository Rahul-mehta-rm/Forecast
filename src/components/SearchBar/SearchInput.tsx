import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          ref={ref}
          type="text"
          className="w-full px-4 py-2 pl-10 pr-12 text-gray-900 bg-white dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...props}
        />
        {props.value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ×
          </button>
        )}
      </div>
    );
  }
);