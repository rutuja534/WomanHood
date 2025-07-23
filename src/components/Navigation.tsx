import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Shield, Users, BookOpen, LogIn, Brain, LogOut, Calendar, Baby, LayoutDashboard, Lightbulb, Bell, User } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center group">
              <Heart className="h-8 w-8 text-rose-500 transition-transform group-hover:scale-110" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
                WomanHood
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <LayoutDashboard className="h-5 w-5 mr-1" />
              <span>Dashboard</span>
            </Link>
            <Link to="/symptoms" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <Shield className="h-5 w-5 mr-1" />
              <span>Symptoms</span>
            </Link>
            <Link to="/mood" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <Brain className="h-5 w-5 mr-1" />
              <span>Mood</span>
            </Link>
            <Link to="/menstrual" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <Calendar className="h-5 w-5 mr-1" />
              <span>Cycle</span>
            </Link>
            <Link to="/pregnancy" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <Baby className="h-5 w-5 mr-1" />
              <span>Pregnancy</span>
            </Link>
            <Link to="/health-resources" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <BookOpen className="h-5 w-5 mr-1" />
              <span>Resources</span>
            </Link>
            <Link to="/health-tips" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <Lightbulb className="h-5 w-5 mr-1" />
              <span>Tips</span>
            </Link>
            <Link to="/about" className="flex items-center text-gray-600 hover:text-rose-500 transition-colors">
              <Users className="h-5 w-5 mr-1" />
              <span>About</span>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/notifications" className="text-gray-600 hover:text-rose-500 transition-colors">
                  <Bell className="h-5 w-5" />
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-rose-500 transition-colors">
                  <User className="h-5 w-5" />
                </Link>
                <span className="text-gray-600">{userEmail}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white bg-rose-500 px-4 py-2 rounded-full hover:bg-rose-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="flex items-center text-white bg-rose-500 px-4 py-2 rounded-full hover:bg-rose-600 transition-colors"
              >
                <LogIn className="h-5 w-5 mr-1" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}