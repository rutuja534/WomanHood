import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Brain, Activity, Sparkles, Stethoscope, Target, LayoutDashboard, Lightbulb } from 'lucide-react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeQuote, setActiveQuote] = useState(0);

  const quotes = [
    "Your mental health is just as important as your physical health.",
    "Self-care isn't selfish, it's essential.",
    "Every woman deserves access to quality healthcare.",
    "Your body hears everything your mind says.",
    "Wellness is a journey, not a destination.",
    "Mental strength is your superpower.",
    "Taking care of yourself is productive.",
    "Your health is an investment, not an expense."
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const quoteInterval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Animated Quote Banner */}
      <div className="bg-rose-500 text-white py-2 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-8">
            {quotes.map((quote, index) => (
              <p
                key={index}
                className={`absolute transition-all duration-500 transform ${
                  index === activeQuote
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
              >
                {quote}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section with Enhanced Animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-rose-500 animate-[heartbeat_1.5s_ease-in-out_infinite]" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in">
              <span className="block text-gray-900">Empowering Women</span>
              <span className="block bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                Through AI-Driven Healthcare
              </span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500 animate-fade-in-up">
              Your personal health companion powered by advanced AI. Track symptoms, emotions, and take control of your health journey.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="group px-8 py-3 rounded-full text-white bg-rose-500 hover:bg-rose-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center">
                  <LayoutDashboard className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  View Dashboard
                </span>
              </Link>
              <Link
                to="/health-tips"
                className="group px-8 py-3 rounded-full text-rose-500 bg-white border-2 border-rose-500 hover:bg-rose-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Health Tips
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-rose-500" />}
            title="Smart Symptom Tracking"
            description="AI-powered analysis of your symptoms with personalized insights and recommendations."
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8 text-rose-500" />}
            title="Mood & Emotion Analysis"
            description="Track your emotional well-being with AI-driven insights and personalized support."
          />
          <FeatureCard
            icon={<Target className="w-8 h-8 text-rose-500" />}
            title="Goal Setting & Tracking"
            description="Set and track your health goals with interactive progress monitoring."
          />
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 max-w-7xl mx-auto mb-8">
        <p><strong>Medical Disclaimer:</strong> The information provided is for educational purposes only and is not intended as medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}