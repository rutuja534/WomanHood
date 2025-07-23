import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SymptomTracker from './components/SymptomTracker';
import About from './components/About';
import Auth from './components/Auth';
import Home from './components/Home';
import Goals from './components/Goals';
import MoodTracker from './components/MoodTracker';
import HealthResources from './components/HealthResources';
import MenstrualTracker from './components/MenstrualTracker';
import PregnancyTracker from './components/PregnancyTracker';
import Dashboard from './components/Dashboard';
import HealthTips from './components/HealthTips';
import Notifications from './components/Notifications';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/symptoms" element={<SymptomTracker />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/health-resources" element={<HealthResources />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/mood" element={<MoodTracker />} />
            <Route path="/menstrual" element={<MenstrualTracker />} />
            <Route path="/pregnancy" element={<PregnancyTracker />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;