import React, { useState, useEffect } from 'react';
import { Bell, Check, X, Calendar, Heart, Droplet, Pill, Activity, Clock, Settings } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'health' | 'appointment' | 'achievement';
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationSettings {
  reminders: boolean;
  healthTips: boolean;
  appointments: boolean;
  achievements: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Medication Reminder',
      message: 'Time to take your prenatal vitamin',
      type: 'reminder',
      time: '2 hours ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Hydration Check',
      message: 'You\'ve only had 4 glasses of water today. Try to drink 4 more!',
      type: 'health',
      time: '3 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Upcoming Appointment',
      message: 'Your gynecologist appointment is tomorrow at 2:00 PM',
      type: 'appointment',
      time: '1 day ago',
      read: true,
      priority: 'high'
    },
    {
      id: '4',
      title: 'Achievement Unlocked!',
      message: 'You\'ve tracked your mood for 7 consecutive days!',
      type: 'achievement',
      time: '2 days ago',
      read: false,
      priority: 'low'
    },
    {
      id: '5',
      title: 'Cycle Prediction',
      message: 'Your next period is expected to start in 3 days',
      type: 'health',
      time: '3 days ago',
      read: true,
      priority: 'medium'
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    reminders: true,
    healthTips: true,
    appointments: true,
    achievements: true,
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00'
    }
  });

  const [showSettings, setShowSettings] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Pill className="w-5 h-5 text-blue-500" />;
      case 'health':
        return <Heart className="w-5 h-5 text-rose-500" />;
      case 'appointment':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      case 'achievement':
        return <Activity className="w-5 h-5 text-green-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-8 h-8 text-rose-500 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.reminders}
                    onChange={(e) => setSettings({...settings, reminders: e.target.checked})}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-gray-700">Medication & Health Reminders</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.healthTips}
                    onChange={(e) => setSettings({...settings, healthTips: e.target.checked})}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-gray-700">Daily Health Tips</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.appointments}
                    onChange={(e) => setSettings({...settings, appointments: e.target.checked})}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-gray-700">Appointment Reminders</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.achievements}
                    onChange={(e) => setSettings({...settings, achievements: e.target.checked})}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-gray-700">Achievement Notifications</span>
                </label>
              </div>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.quietHours.enabled}
                    onChange={(e) => setSettings({
                      ...settings, 
                      quietHours: {...settings.quietHours, enabled: e.target.checked}
                    })}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-gray-700">Enable Quiet Hours</span>
                </label>
                {settings.quietHours.enabled && (
                  <div className="ml-6 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">From:</label>
                      <input
                        type="time"
                        value={settings.quietHours.start}
                        onChange={(e) => setSettings({
                          ...settings,
                          quietHours: {...settings.quietHours, start: e.target.value}
                        })}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">To:</label>
                      <input
                        type="time"
                        value={settings.quietHours.end}
                        onChange={(e) => setSettings({
                          ...settings,
                          quietHours: {...settings.quietHours, end: e.target.value}
                        })}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-lg border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? 'ring-2 ring-rose-100' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete notification"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
            <Droplet className="w-5 h-5 text-blue-500 mr-3" />
            <span className="font-medium text-gray-900">Log Water Intake</span>
          </button>
          <button className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
            <Pill className="w-5 h-5 text-green-500 mr-3" />
            <span className="font-medium text-gray-900">Mark Medication Taken</span>
          </button>
          <button className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow">
            <Heart className="w-5 h-5 text-rose-500 mr-3" />
            <span className="font-medium text-gray-900">Track Symptoms</span>
          </button>
        </div>
      </div>
    </div>
  );
}