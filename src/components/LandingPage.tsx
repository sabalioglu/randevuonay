import React, { useState } from 'react';
import { Calendar, Users, Settings, BarChart3, MessageSquare, Clock, Phone, Mail, Shield, Star, ArrowRight, Menu, X, CheckCircle, Zap, Globe } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">SchedulePro</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Pricing</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                <button 
                  onClick={() => onNavigate('customer-booking')}
                  className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('login')}
                className="text-gray-600 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600">Features</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600">Pricing</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600">Contact</a>
              <button 
                onClick={() => onNavigate('customer-booking')}
                className="block w-full text-left px-3 py-2 text-gray-600"
              >
                Book Appointment
              </button>
              <button 
                onClick={() => onNavigate('login')}
                className="block w-full text-left px-3 py-2 text-gray-600"
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-lg mt-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Scheduling for
              <span className="text-blue-600"> Clinics </span> &
              <span className="text-green-600"> Salons</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Streamline your appointment management with AI-powered scheduling, automated reminders, 
              and comprehensive business analytics. Perfect for medical clinics, beauty salons, and wellness centers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('register')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => onNavigate('customer-booking')}
                className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Try Demo Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for healthcare and beauty professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Assistant</h3>
              <p className="text-gray-600">
                Smart scheduling assistant that handles complex bookings, manages waitlists, and optimizes your calendar automatically.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
              <p className="text-gray-600">
                Intelligent calendar management with conflict detection, automated reminders, and optimal time slot suggestions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Staff Management</h3>
              <p className="text-gray-600">
                Manage multiple practitioners, track their schedules, and assign services based on specializations and availability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Analytics</h3>
              <p className="text-gray-600">
                Comprehensive reports on bookings, revenue, customer retention, and staff performance with actionable insights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">HIPAA Compliant</h3>
              <p className="text-gray-600">
                Enterprise-grade security with encrypted data storage, audit trails, and full compliance with healthcare regulations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Location Support</h3>
              <p className="text-gray-600">
                Manage multiple locations from one dashboard with location-specific staff, services, and booking preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your business size and needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">Perfect for small practices</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Up to 2 staff members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">500 appointments/month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Email reminders</span>
                </li>
              </ul>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
              <p className="text-gray-600 mb-6">For growing businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$79</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Up to 10 staff members</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Unlimited appointments</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">SMS & Email reminders</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">AI scheduling assistant</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For large organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$199</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Unlimited staff</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Multi-location support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-600">Custom branding</span>
                </li>
              </ul>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">SchedulePro</span>
              </div>
              <p className="text-gray-400">
                The complete appointment scheduling solution for healthcare and beauty professionals.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>1-800-SCHEDULE</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>support@schedulepro.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SchedulePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;