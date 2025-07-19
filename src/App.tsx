import React, { useState } from 'react';
import { Calendar, Users, Settings, BarChart3, MessageSquare, Clock, Phone, Mail, Shield, Star, ArrowRight, Menu, X } from 'lucide-react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import CustomerBooking from './components/CustomerBooking';
import AIAssistant from './components/AIAssistant';

type ViewType = 'landing' | 'login' | 'register' | 'dashboard' | 'customer-booking' | 'ai-assistant';

interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: 'clinic' | 'salon' | 'spa';
  businessId: string;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'login':
      case 'register':
        return <LoginPage type={currentView} onLogin={handleLogin} onNavigate={setCurrentView} />;
      case 'dashboard':
        return <Dashboard user={user!} onLogout={handleLogout} onNavigate={setCurrentView} />;
      case 'customer-booking':
        return <CustomerBooking onNavigate={setCurrentView} />;
      case 'ai-assistant':
        return <AIAssistant onNavigate={setCurrentView} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderView()}
    </div>
  );
}

export default App;