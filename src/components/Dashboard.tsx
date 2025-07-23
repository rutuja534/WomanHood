import React, { useState, useEffect } from 'react';
import { Calendar, Heart, Brain, Activity, TrendingUp, Bell, Award, Target, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

interface Reminder {
  id: string;
  title: string;
  time: string;
  type: 'medication' | 'appointment' | 'exercise' | 'water';
  completed: boolean;
}

export default function Dashboard() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    { id: '1', name: 'Water Intake', value: 6, unit: 'glasses', trend: 'up', lastUpdated: 'Today' },
    { id: '2', name: 'Sleep Hours', value: 7.5, unit: 'hours', trend: 'stable', lastUpdated: 'Last night' },
    { id: '3', name: 'Exercise Minutes', value: 45, unit: 'minutes', trend: 'up', lastUpdated: 'Today' },
    { id: '4', name: 'Mood Score', value: 8, unit: '/10', trend: 'up', lastUpdated: '2 hours ago' }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    { id: '1', title: 'Take prenatal vitamin', time: '9:00 AM', type: 'medication', completed: false },
    { id: '2', title: 'Drink water', time: '10:00 AM', type: 'water', completed: true },
    { id: '3', title: 'Doctor appointment', time: '2:00 PM', type: 'appointment', completed: false },
    { id: '4', title: 'Evening walk', time: '6:00 PM', type: 'exercise', completed: false }
  ]);

  const [achievements, setAchievements] = useState([
    { id: '1', title: 'Hydration Hero', description: 'Drank 8 glasses of water for 7 days straight', earned: true },
    { id: '2', title: 'Mood Tracker', description: 'Logged mood for 30 consecutive days', earned: true },
    { id: '3', title: 'Exercise Enthusiast', description: 'Completed 150 minutes of exercise this week', earned: false }
  ]);

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'medication':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'appointment':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'exercise':
        return <Activity className="w-5 h-5 text-green-500" />;
      case 'water':
        return <div className="w-5 h-5 bg-blue-400 rounded-full" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Health Dashboard</h1>
        <p className="text-gray-600">Track your wellness journey and stay on top of your health goals</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {healthMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <span className="ml-1 text-sm text-gray-500">{metric.unit}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{metric.lastUpdated}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Reminders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Today's Reminders</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {reminders.map((reminder) => (
                <div key={reminder.id} className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                  reminder.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                }`}>
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                      reminder.completed 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-gray-300 hover:border-rose-500'
                    }`}
                  >
                    {reminder.completed && <span className="text-xs">✓</span>}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center">
                      {getReminderIcon(reminder.type)}
                      <span className={`ml-2 font-medium ${
                        reminder.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {reminder.title}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{reminder.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Achievements */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/symptoms"
                className="flex items-center p-3 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
              >
                <Heart className="w-5 h-5 text-rose-500 mr-3" />
                <span className="font-medium text-gray-900">Log Symptoms</span>
              </Link>
              <Link
                to="/mood"
                className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
              >
                <Brain className="w-5 h-5 text-purple-500 mr-3" />
                <span className="font-medium text-gray-900">Track Mood</span>
              </Link>
              <Link
                to="/menstrual"
                className="flex items-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
              >
                <Calendar className="w-5 h-5 text-pink-500 mr-3" />
                <span className="font-medium text-gray-900">Update Cycle</span>
              </Link>
              <Link
                to="/goals"
                className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <Target className="w-5 h-5 text-green-500 mr-3" />
                <span className="font-medium text-gray-900">View Goals</span>
              </Link>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement.id} className={`p-3 rounded-lg border-2 ${
                  achievement.earned 
                    ? 'bg-yellow-50 border-yellow-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center">
                    <Award className={`w-5 h-5 mr-2 ${
                      achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                    }`} />
                    <span className={`font-medium ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 ml-7">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Health Insights */}
      <div className="mt-8 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-rose-500 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Today's Health Insight</h3>
            <p className="text-gray-700">
              You're doing great with your water intake! Consider adding some light stretching to your evening routine 
              to help improve your sleep quality. Remember, small consistent changes lead to big health improvements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}