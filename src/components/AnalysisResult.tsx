import React from 'react';
import { AlertCircle } from 'lucide-react';

interface AnalysisResultProps {
  analysis: string;
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  if (!analysis) return null;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start mb-4">
        <AlertCircle className="w-5 h-5 text-rose-500 mr-2 mt-1" />
        <h3 className="text-lg font-semibold text-gray-800">Analysis Results</h3>
      </div>
      <div className="prose max-w-none">
        <p className="text-gray-700 whitespace-pre-line">{analysis}</p>
      </div>
    </div>
  );
}