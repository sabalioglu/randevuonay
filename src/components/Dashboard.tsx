import React, { useState } from 'react';
import { Calendar, Users, Settings, BarChart3, MessageSquare, Clock, Phone, Mail, LogOut, Plus, Search, Filter, ChevronDown, AlertCircle, CheckCircle, TrendingUp, DollarSign, Loader2 } from 'lucide-react';
import { signOut } from '../lib/supabase';

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    businessName: string;
    businessType: 'clinic' | 'salon' | 'spa';
    businessId: string;
  };
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const stats = [
    { name: 'Today\'s Appointments', value: '12', change: '+2', changeType: 'increase', icon: Calendar },
    { name: 'This Week\'s Revenue', value: '$3,248', change: '+12%', changeType: 'increase', icon: DollarSign },
    { name: 'Active Customers', value: '147', change: '+5', changeType: 'increase', icon: Users },
    { name: 'Avg. Rating', value: '4.9', change: '+0.1', changeType: 'increase', icon: CheckCircle },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      onLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const todaysAppointments = [
    { id: 1, time: '9:00 AM', customer: 'Emma Thompson', service: 'Dental Cleaning', staff: 'Dr. Johnson', status: 'confirmed' },
    { id: 2, time: '10:30 AM', customer: 'Michael Brown', service: 'Root Canal', staff: 'Dr. Smith', status: 'in-progress' },
    { id: 3, time: '11:15 AM', customer: 'Sarah Davis', service: 'Checkup', staff: 'Dr. Johnson', status: 'confirmed' },
    { id: 4, time: '2:00 PM', customer: 'James Wilson', service: 'Teeth Whitening', staff: 'Dr. Brown', status: 'pending' },
    { id: 5, time: '3:30 PM', customer: 'Lisa Garcia', service: 'Filling', staff: 'Dr. Smith', status: 'confirmed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.changeType === 'increase' ? 'bg-green-100' : 'bg-red-100'}`}>
                <stat.icon className={`h-6 w-6 ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`} />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Today's Appointments</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {todaysAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <p className="text-lg font-semibold text-gray-900">{appointment.customer}</p>
                    <p className="text-sm text-gray-600">{appointment.service} • {appointment.staff}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCalendar = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900">Calendar View</h3>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </button>
        </div>
      </div>
      <div className="text-center py-12 text-gray-500">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p>Calendar integration coming soon...</p>
        <p className="text-sm">Full calendar view with drag-and-drop scheduling</p>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Customer Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
        <div className="text-center py-12 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Customer management interface</p>
          <p className="text-sm">View, edit, and manage customer information</p>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Business Analytics</h3>
        <div className="text-center py-12 text-gray-500">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>Analytics dashboard coming soon...</p>
          <p className="text-sm">Revenue tracking, customer insights, and performance metrics</p>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Business Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={user.businessName}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="clinic">Medical Clinic</option>
              <option value="salon">Beauty Salon</option>
              <option value="spa">Spa & Wellness</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="time"
                defaultValue="09:00"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="time"
                defaultValue="17:00"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'calendar': return renderCalendar();
      case 'customers': return renderCustomers();
      case 'analytics': return renderAnalytics();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SchedulePro</span>
              <span className="ml-4 text-sm text-gray-500">|</span>
              <span className="ml-4 text-sm font-medium text-gray-700">{user.businessName}</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('ai-assistant')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Assistant
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <LogOut className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 mr-8">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === 'calendar' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-5 w-5 mr-3" />
                Calendar
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === 'customers' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                Customers
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === 'analytics' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <TrendingUp className="h-5 w-5 mr-3" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;