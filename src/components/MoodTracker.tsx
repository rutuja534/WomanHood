import React, { useState } from 'react';
import { Brain, Send, Smile, Frown, Meh, Heart, AlertTriangle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LoadingSpinner } from './LoadingSpinner';
import { getGeminiResponse } from '../lib/gemini';

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😠', label: 'Angry', value: 'angry' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '🥱', label: 'Tired', value: 'tired' }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState('');
  const [notes, setNotes] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeMood = async () => {
    if (!selectedMood || !notes) {
      setError('Please select a mood and add some notes about how you\'re feeling.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const prompt = `As an empathetic AI counselor, analyze this mood entry:
      Mood: ${selectedMood}
      Notes: ${notes}

      Please provide:
      1. Emotional Pattern Analysis
      2. Potential Triggers or Factors
      3. Self-Care Recommendations
      4. Positive Affirmations
      
      Keep the response supportive and encouraging.`;

      const response = await getGeminiResponse(prompt);
      setAnalysis(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to analyze mood. Please try again later.');
      }
      console.error('Mood analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 text-center">
        <Brain className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Mood Tracker</h2>
        <p className="text-gray-600">Track your emotional well-being and get personalized insights</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {moods.map(mood => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                selectedMood === mood.value
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-gray-200 hover:border-rose-300'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tell us more about how you're feeling
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="What's on your mind? How has your day been?"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <button
          onClick={analyzeMood}
          disabled={loading}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Get Insights
            </>
          )}
        </button>
      </div>

      {analysis && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Heart className="w-5 h-5 text-rose-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-800">Your Personalized Insights</h3>
          </div>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
}