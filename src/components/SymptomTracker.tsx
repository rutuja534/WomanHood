import React, { useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { analyzeSymptoms, GeminiError } from '../lib/gemini';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { SymptomInput } from './SymptomInput';
import { AnalysisResult } from './AnalysisResult';

export default function SymptomTracker() {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateInput = (input: string): string | null => {
    if (!input.trim()) {
      return 'Please describe your symptoms';
    }
    if (input.length < 10) {
      return 'Please provide more detail about your symptoms';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateInput(symptoms);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setAnalysis('');
    setLoading(true);

    try {
      const result = await analyzeSymptoms(symptoms);
      setAnalysis(result);
    } catch (err) {
      if (err instanceof GeminiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      console.error('Error analyzing symptoms:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8 text-center">
          <Heart className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Symptom Tracker</h2>
          <p className="text-gray-600">Track your symptoms and get AI-powered insights</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your symptoms
            </label>
            
            <SymptomInput
              value={symptoms}
              onChange={(value) => {
                setSymptoms(value);
                setError('');
              }}
              error={error}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  <span className="ml-2">Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Get Analysis
                </>
              )}
            </button>
          </div>
        </form>

        <AnalysisResult analysis={analysis} />
      </div>
    </ErrorBoundary>
  );
}