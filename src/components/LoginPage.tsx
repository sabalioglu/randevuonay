import React, { useState } from 'react';
import { Calendar, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { signIn, signUp } from '../lib/supabase';

interface LoginPageProps {
  type: 'login' | 'register';
  onLogin: (user: any) => void;
  onNavigate: (view: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ type, onLogin, onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    businessType: 'clinic' as 'clinic' | 'salon' | 'spa',
    firstName: '',
    lastName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      if (type === 'register') {
        const { user, business } = await signUp(formData.email, formData.password, {
          name: formData.businessName,
          type: formData.businessType,
          phone: '',
          address: ''
        });
        
        if (user && business) {
          onLogin({
            id: user.id,
            name: `${formData.firstName} ${formData.lastName}`,
            email: user.email!,
            businessName: business.name,
            businessType: business.type,
            businessId: business.id
          });
        }
      } else {
        // Handle demo accounts
        if (formData.email.startsWith('demo@')) {
          const demoData = {
            'demo@clinic.com': {
              id: 'demo-clinic',
              name: 'Dr. Sarah Johnson',
              businessName: 'Bright Smile Dental Clinic',
              businessType: 'clinic' as const,
              businessId: 'demo-clinic-id'
            },
            'demo@salon.com': {
              id: 'demo-salon',
              name: 'Maria Rodriguez',
              businessName: 'Luxe Beauty Salon',
              businessType: 'salon' as const,
              businessId: 'demo-salon-id'
            },
            'demo@spa.com': {
              id: 'demo-spa',
              name: 'David Kim',
              businessName: 'Zen Wellness Spa',
              businessType: 'spa' as const,
              businessId: 'demo-spa-id'
            }
          };
          
          const demo = demoData[formData.email as keyof typeof demoData];
          if (demo && formData.password === 'demo123') {
            onLogin({
              ...demo,
              email: formData.email
            });
            return;
          }
        }
        
        const { user, business } = await signIn(formData.email, formData.password);
        
        if (user && business) {
          onLogin({
            id: user.id,
            name: user.email!.split('@')[0], // Fallback name
            email: user.email!,
            businessName: business.name,
            businessType: business.type,
            businessId: business.id
          });
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </button>
          
          <div className="flex justify-center">
            <div className="flex items-center">
              <Calendar className="h-12 w-12 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">SchedulePro</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {type === 'login' ? 'Sign in to your account' : 'Create your business account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => onNavigate('register')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => onNavigate('login')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
        
        {/* Demo Credentials */}
        {type === 'login' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Hesapları</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Diş Kliniği:</strong> demo@clinic.com / demo123</p>
              <p><strong>Güzellik Salonu:</strong> demo@salon.com / demo123</p>
              <p><strong>Spa & Wellness:</strong> demo@spa.com / demo123</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  email: 'demo@clinic.com',
                  password: 'demo123'
                });
              }}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Diş kliniği demo bilgilerini kullan
            </button>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {type === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="First name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="Your business name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                      Business Type
                    </label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="clinic">Medical Clinic</option>
                      <option value="salon">Beauty Salon</option>
                      <option value="spa">Spa & Wellness</option>
                    </select>
                  </div>
                </>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={type === 'login' ? 'current-password' : 'new-password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {type === 'login' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {type === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  type === 'login' ? 'Sign In' : 'Create Account'
                )}
              </button>
            </div>

        </form>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {type === 'register' && (
          <div className="text-xs text-gray-500 text-center">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;