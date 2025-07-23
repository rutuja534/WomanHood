import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, Moon, Thermometer, Heart, Brain, Activity, AlertCircle, Plus, ChevronLeft, ChevronRight, Save, Download, Clock, Info } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { LoadingSpinner } from './LoadingSpinner';
import { getGeminiResponse } from '../lib/gemini';

interface CycleDay {
  date: Date;
  type: 'period' | 'fertile' | 'ovulation' | 'pms' | 'normal';
  symptoms?: string[];
  mood?: string;
  temperature?: number;
  notes?: string;
  flowIntensity?: 'light' | 'medium' | 'heavy';
  medications?: string[];
  phaseDay?: number;
}

interface Symptom {
  id: string;
  name: string;
  severity: number;
}

const symptoms = [
  { id: 'cramps', name: 'Cramps' },
  { id: 'headache', name: 'Headache' },
  { id: 'bloating', name: 'Bloating' },
  { id: 'fatigue', name: 'Fatigue' },
  { id: 'mood_swings', name: 'Mood Swings' },
  { id: 'breast_tenderness', name: 'Breast Tenderness' },
  { id: 'acne', name: 'Acne' },
  { id: 'backache', name: 'Backache' }
];

const moods = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😠', label: 'Irritable' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🥱', label: 'Tired' }
];

const flowIntensities = [
  { id: 'light', label: 'Light', icon: '•' },
  { id: 'medium', label: 'Medium', icon: '••' },
  { id: 'heavy', label: 'Heavy', icon: '•••' }
];

export default function MenstrualTracker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [temperature, setTemperature] = useState('');
  const [notes, setNotes] = useState('');
  const [medications, setMedications] = useState<string[]>([]);
  const [flowIntensity, setFlowIntensity] = useState<'light' | 'medium' | 'heavy' | null>(null);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [cycleData, setCycleData] = useState<CycleDay[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [newMedication, setNewMedication] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (lastPeriodDate) {
      generateCycleData();
    }
  }, [lastPeriodDate, cycleLength]);

  const generateCycleData = useCallback(() => {
    if (!lastPeriodDate) return;

    const data: CycleDay[] = [];
    const startDate = new Date(lastPeriodDate);
    
    // Generate 3 months of cycle data
    for (let i = 0; i < 90; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dayInCycle = Math.floor(i % cycleLength);
      let type: CycleDay['type'] = 'normal';

      // Period phase (days 1-5)
      if (dayInCycle < 5) {
        type = 'period';
      }
      // Fertile window (5 days before ovulation)
      else if (dayInCycle >= 9 && dayInCycle <= 13) {
        type = 'fertile';
      }
      // Ovulation day (typically day 14 in a 28-day cycle, adjusted for cycle length)
      else if (dayInCycle === Math.floor(cycleLength / 2) - 1) {
        type = 'ovulation';
      }
      // PMS window (7-10 days before next period)
      else if (dayInCycle >= cycleLength - 10 && dayInCycle < cycleLength) {
        type = 'pms';
      }

      data.push({
        date: currentDate,
        type,
        phaseDay: dayInCycle + 1
      });
    }

    setCycleData(data);
  }, [lastPeriodDate, cycleLength]);

  const getAIInsights = async () => {
    if (!lastPeriodDate) {
      setError('Please enter your last period date to get insights.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const prompt = `As a women's health expert, provide personalized insights and recommendations based on the following menstrual cycle data:

      Last Period Date: ${lastPeriodDate.toLocaleDateString()}
      Cycle Length: ${cycleLength} days
      Current Symptoms: ${selectedSymptoms.map(s => `${s.name} (Severity: ${s.severity})`).join(', ')}
      Mood: ${selectedMood}
      Temperature: ${temperature}
      Flow Intensity: ${flowIntensity || 'Not specified'}
      Medications: ${medications.join(', ')}

      Please provide:
      1. Current Cycle Phase Analysis
      2. Personalized Wellness Tips
      3. Diet and Exercise Recommendations
      4. Self-Care Suggestions
      5. Medication Reminders (if applicable)
      
      Keep the response supportive, practical, and focused on holistic well-being.`;

      const response = await getGeminiResponse(prompt);
      setInsights(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to generate insights. Please try again later.');
      }
      console.error('Error getting AI insights:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSymptomChange = (symptomId: string, severity: number) => {
    setSelectedSymptoms(prev => {
      const existing = prev.find(s => s.id === symptomId);
      if (existing) {
        return prev.map(s => s.id === symptomId ? { ...s, severity } : s);
      }
      const symptom = symptoms.find(s => s.id === symptomId);
      if (symptom) {
        return [...prev, { ...symptom, severity }];
      }
      return prev;
    });
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications(prev => [...prev, newMedication.trim()]);
      setNewMedication('');
    }
  };

  const removeMedication = (index: number) => {
    setMedications(prev => prev.filter((_, i) => i !== index));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getDayClass = (date: Date) => {
    const cycleDay = cycleData.find(d => 
      d.date.toDateString() === date.toDateString()
    );

    const isToday = date.toDateString() === new Date().toDateString();
    const baseClasses = 'calendar-day flex flex-col items-center justify-center relative';

    if (!cycleDay) return `${baseClasses} bg-white`;

    const typeClasses = {
      period: 'period-day',
      fertile: 'fertile-window',
      ovulation: 'ovulation-day',
      pms: 'pms-day',
      normal: 'bg-white hover:bg-gray-50'
    };

    return `${baseClasses} ${typeClasses[cycleDay.type]} ${isToday ? 'current' : ''}`;
  };

  const handleDayHover = (event: React.MouseEvent, date: Date) => {
    const cycleDay = cycleData.find(d => d.date.toDateString() === date.toDateString());
    if (cycleDay) {
      setTooltipContent(getCycleDayInfo(cycleDay));
      setTooltipPosition({ x: event.clientX, y: event.clientY });
      setShowTooltip(true);
    }
  };

  const getCycleDayInfo = (day: CycleDay) => {
    const phaseInfo = {
      period: `Menstrual Phase (Day ${day.phaseDay})`,
      fertile: `Fertile Window (Day ${day.phaseDay})`,
      ovulation: `Ovulation Day (Day ${day.phaseDay})`,
      pms: `Pre-menstrual Phase (Day ${day.phaseDay})`,
      normal: `Regular Phase (Day ${day.phaseDay})`
    };
    return phaseInfo[day.type];
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(1 - firstDayOfMonth.getDay());

    const weeks = [];
    let currentDate = new Date(startDate);

    while (currentDate <= lastDayOfMonth || weeks.length < 6) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate);
        const cycleDay = cycleData.find(d => d.date.toDateString() === date.toDateString());
        
        week.push(
          <div
            key={date.toISOString()}
            className={getDayClass(date)}
            onMouseEnter={(e) => handleDayHover(e, date)}
            onMouseLeave={() => setShowTooltip(false)}
            role="gridcell"
            aria-label={`${date.toLocaleDateString()} - ${cycleDay ? getCycleDayInfo(cycleDay) : 'No cycle data'}`}
          >
            <span className={`text-sm ${
              date.getMonth() === currentMonth.getMonth()
                ? 'font-medium'
                : 'text-gray-400'
            }`}>
              {date.getDate()}
            </span>
            {cycleDay?.phaseDay && (
              <span className="text-xs text-gray-500 mt-1">
                {cycleDay.phaseDay}
              </span>
            )}
          </div>
        );
        currentDate.setDate(currentDate.getDate() + 1);
      }
      weeks.push(
        <div key={weeks.length} className="grid grid-cols-7 gap-px" role="row">
          {week}
        </div>
      );
    }

    return weeks;
  };

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <Moon className="w-12 h-12 text-primary-teal mx-auto mb-4" />
        <h1 className="text-3xl font-sofia font-bold text-gray-900">Menstrual Health Tracker</h1>
        <p className="mt-2 text-gray-600 font-inter">Track your cycle, symptoms, and get personalized insights</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="bg-white rounded-card shadow-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-sofia font-semibold text-gray-900">Cycle Calendar</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <span className="text-lg font-medium text-gray-700">
                  {currentMonth.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                </span>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cycle Length
              </label>
              <input
                type="range"
                min="20"
                max="40"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="input-slider"
                aria-label="Cycle length in days"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>20 days</span>
                <span>{cycleLength} days</span>
                <span>40 days</span>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-7 gap-px text-center">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-sm font-medium text-gray-700 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid gap-px" role="grid">
              {renderCalendar()}
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-50">
                <div className="w-4 h-4 rounded-full period-day mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Period</span>
                  <span className="text-xs text-gray-500">Days 1-5</span>
                </div>
              </div>
              <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-50">
                <div className="w-4 h-4 rounded-full fertile-window mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Fertile Window</span>
                  <span className="text-xs text-gray-500">Days 10-14</span>
                </div>
              </div>
              <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-50">
                <div className="w-4 h-4 rounded-full bg-[#9C27B0] mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">Ovulation</span>
                  <span className="text-xs text-gray-500">Day 14</span>
                </div>
              </div>
              <div className="flex items-center p-2 rounded-lg transition-colors hover:bg-gray-50">
                <div className="w-4 h-4 rounded-full bg-[#FFF3E0] mr-2" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-600">PMS</span>
                  <span className="text-xs text-gray-500">Days 19-28</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-card shadow-card p-6">
            <h2 className="text-xl font-sofia font-semibold text-gray-900 mb-4">Track Today</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Period Start Date
                </label>
                <input
                  type="date"
                  value={lastPeriodDate?.toISOString().split('T')[0] || ''}
                  onChange={(e) => setLastPeriodDate(new Date(e.target.value))}
                  className="w-full rounded-lg border-gray-300 focus:ring-primary-teal focus:border-primary-teal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Flow Intensity
                </label>
                <div className="flex gap-4">
                  {flowIntensities.map(intensity => (
                    <button
                      key={intensity.id}
                      onClick={() => setFlowIntensity(intensity.id as 'light' | 'medium' | 'heavy')}
                      className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                        flowIntensity === intensity.id
                          ? 'border-primary-teal bg-primary-lavender'
                          : 'border-gray-200 hover:border-primary-teal'
                      }`}
                    >
                      <div className="text-lg mb-1">{intensity.icon}</div>
                      <div className="text-sm">{intensity.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms & Severity
                </label>
                <div className="space-y-2">
                  {symptoms.map(symptom => (
                    <div key={symptom.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{symptom.name}</span>
                      <div className="symptom-severity">
                        {[1, 2, 3, 4, 5].map(level => (
                          <button
                            key={level}
                            onClick={() => handleSymptomChange(symptom.id, level)}
                            className={`severity-radio ${
                              selectedSymptoms.find(s => s.id === symptom.id)?.severity === level
                                ? 'active'
                                : ''
                            }`}
                            aria-label={`Severity level ${level} for ${symptom.name}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood
                </label>
                <div className="flex flex-wrap gap-2">
                  {moods.map(mood => (
                    <button
                      key={mood.label}
                      onClick={() => setSelectedMood(mood.label)}
                      className={`p-2 rounded-lg border-2 transition-colors ${
                        selectedMood === mood.label
                          ? 'border-primary-teal bg-primary-lavender'
                          : 'border-gray-200 hover:border-primary-teal'
                      }`}
                      aria-label={`Select mood: ${mood.label}`}
                    >
                      <div className="text-2xl">{mood.emoji}</div>
                      <div className="text-xs">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature (°F)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:ring-primary-teal focus:border-primary-teal"
                  placeholder="98.6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    className="flex-1 rounded-lg border-gray-300 focus:ring-primary-teal focus:border-primary-teal"
                    placeholder="Add medication..."
                  />
                  <button
                    onClick={addMedication}
                    className="px-4 py-2 bg-primary-teal text-white rounded-lg hover:bg-opacity-90"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {medications.map((med, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                      <span className="text-sm text-gray-700">{med}</span>
                      <button
                        onClick={() => removeMedication(index)}
                        className="text-gray-400 hover:text-red-500"
                        aria-label={`Remove ${med}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:ring-primary-teal focus:border-primary-teal"
                  rows={3}
                  placeholder="Add any additional notes..."
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}

              <button
                onClick={getAIInsights}
                disabled={loading || !lastPeriodDate}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-button text-white bg-primary-teal hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-teal disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Get AI Insights
                  </>
                )}
              </button>
            </div>
          </div>

          {insights && (
            <div className="bg-white rounded-card shadow-card p-6">
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-primary-teal mr-2" />
                <h3 className="text-lg font-sofia font-semibold text-gray-900">Your Personalized Insights</h3>
              </div>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{insights}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-4">
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 text-primary-teal mr-2" />
            <h3 className="font-medium text-gray-900">Next Period</h3>
          </div>
          <p className="text-gray-600">
            {lastPeriodDate
              ? new Date(lastPeriodDate.getTime() + cycleLength * 24 * 60 * 60 * 1000).toLocaleDateString()
              : 'Not calculated'}
          </p>
        </div>
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center mb-2">
            <Activity className="w-5 h-5 text-primary-teal mr-2" />
            <h3 className="font-medium text-gray-900">Cycle Length</h3>
          </div>
          <p className="text-gray-600">{cycleLength} days</p>
        </div>
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-primary-teal mr-2" />
            <h3 className="font-medium text-gray-900">Current Phase</h3>
          </div>
          <p className="text-gray-600">
            {lastPeriodDate ? 'Calculating...' : 'Not available'}
          </p>
        </div>
        <div className="bg-white rounded-card shadow-card p-4">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-5 h-5 text-primary-teal mr-2" />
            <h3 className="font-medium text-gray-900">Fertility Window</h3>
          </div>
          <p className="text-gray-600">
            {lastPeriodDate ? 'Days 11-17' : 'Not calculated'}
          </p>
        </div>
      </div>

      {showTooltip && (
        <div
          className="tooltip"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 30
          }}
        >
          {tooltipContent}
        </div>
      )}

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg bottom-nav">
        <div className="flex justify-around items-center">
          <button className="p-3 text-primary-teal">
            <Calendar className="w-6 h-6" />
          </button>
          <button className="p-3 text-primary-teal">
            <Activity className="w-6 h-6" />
          </button>
          <button className="p-3 text-primary-teal">
            <Plus className="w-6 h-6" />
          </button>
          <button className="p-3 text-primary-teal">
            <Info className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}