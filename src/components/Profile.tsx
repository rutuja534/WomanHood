import React, { useState } from 'react';
import { User, Edit, Save, X, Camera, Shield, Bell, Heart, Calendar, Activity, Award, Settings } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  age: string;
  height: string;
  weight: string;
  bloodType: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  medications: string[];
  healthGoals: string[];
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    age: '28',
    height: '5\'6"',
    weight: '140 lbs',
    bloodType: 'O+',
    emergencyContact: {
      name: 'John Johnson',
      phone: '+1 (555) 123-4567',
      relationship: 'Spouse'
    },
    medicalHistory: ['Migraine', 'Seasonal Allergies'],
    allergies: ['Penicillin', 'Shellfish'],
    medications: ['Multivitamin', 'Iron Supplement'],
    healthGoals: ['Drink 8 glasses of water daily', 'Exercise 30 minutes daily', 'Track menstrual cycle']
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const addItem = (field: keyof Pick<UserProfile, 'medicalHistory' | 'allergies' | 'medications' | 'healthGoals'>, item: string) => {
    if (item.trim()) {
      setEditedProfile({
        ...editedProfile,
        [field]: [...editedProfile[field], item.trim()]
      });
    }
  };

  const removeItem = (field: keyof Pick<UserProfile, 'medicalHistory' | 'allergies' | 'medications' | 'healthGoals'>, index: number) => {
    setEditedProfile({
      ...editedProfile,
      [field]: editedProfile[field].filter((_, i) => i !== index)
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { id: 'medical', label: 'Medical Info', icon: <Heart className="w-5 h-5" /> },
    { id: 'goals', label: 'Health Goals', icon: <Activity className="w-5 h-5" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield className="w-5 h-5" /> }
  ];

  const achievements = [
    { title: 'Hydration Hero', description: '7 days of meeting water goals', earned: true },
    { title: 'Mood Tracker', description: '30 days of mood logging', earned: true },
    { title: 'Cycle Tracker', description: '3 months of cycle tracking', earned: false }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-rose-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
              <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Achievements Banner */}
      <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <Award className="w-6 h-6 text-yellow-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Your Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              achievement.earned ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-300'
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
              <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {activeTab === 'personal' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({...editedProfile, age: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.age}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.height}
                    onChange={(e) => setEditedProfile({...editedProfile, height: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.height}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.weight}
                    onChange={(e) => setEditedProfile({...editedProfile, weight: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.weight}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                {isEditing ? (
                  <select
                    value={editedProfile.bloodType}
                    onChange={(e) => setEditedProfile({...editedProfile, bloodType: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                ) : (
                  <p className="p-3 bg-gray-50 rounded-lg">{profile.bloodType}</p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.emergencyContact.name}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        emergencyContact: {...editedProfile.emergencyContact, name: e.target.value}
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.emergencyContact.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.emergencyContact.phone}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        emergencyContact: {...editedProfile.emergencyContact, phone: e.target.value}
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.emergencyContact.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.emergencyContact.relationship}
                      onChange={(e) => setEditedProfile({
                        ...editedProfile,
                        emergencyContact: {...editedProfile.emergencyContact, relationship: e.target.value}
                      })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 rounded-lg">{profile.emergencyContact.relationship}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Medical Information</h3>
            
            {/* Medical History */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical History</h4>
              <div className="space-y-2">
                {editedProfile.medicalHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span>{item}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeItem('medicalHistory', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add medical condition"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addItem('medicalHistory', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Allergies */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Allergies</h4>
              <div className="space-y-2">
                {editedProfile.allergies.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span>{item}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeItem('allergies', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add allergy"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addItem('allergies', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Current Medications */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h4>
              <div className="space-y-2">
                {editedProfile.medications.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span>{item}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeItem('medications', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add medication"
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addItem('medications', e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Health Goals</h3>
            <div className="space-y-4">
              {editedProfile.healthGoals.map((goal, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 text-green-500 mr-3" />
                    <span className="font-medium">{goal}</span>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => removeItem('healthGoals', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add health goal"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addItem('healthGoals', e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Privacy & Security</h3>
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Data Privacy</h4>
                <p className="text-gray-600 mb-4">Control how your health data is used and shared.</p>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" defaultChecked />
                    <span className="ml-2 text-gray-700">Allow anonymous data for research purposes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                    <span className="ml-2 text-gray-700">Share data with healthcare providers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" defaultChecked />
                    <span className="ml-2 text-gray-700">Receive personalized health recommendations</span>
                  </label>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Account Security</h4>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Change Password
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Enable Two-Factor Authentication
                  </button>
                  <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    Download My Data
                  </button>
                </div>
              </div>

              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <h4 className="font-semibold text-red-900 mb-2">Danger Zone</h4>
                <p className="text-red-700 mb-4">These actions cannot be undone.</p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}