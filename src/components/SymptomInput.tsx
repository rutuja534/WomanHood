import React from 'react';
import { XCircle } from 'lucide-react';

interface SymptomInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function SymptomInput({ value, onChange, error }: SymptomInputProps) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-offset-2 ${
          error 
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-rose-500 focus:border-rose-500'
        }`}
        placeholder="Please provide detailed information about what you're experiencing..."
      />
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600">
          <XCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}