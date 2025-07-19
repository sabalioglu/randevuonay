import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, ArrowLeft, CheckCircle, MapPin, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getPublicBusinesses, getPublicServices, getPublicStaff, createAppointment } from '../lib/supabase';

interface CustomerBookingProps {
  onNavigate: (view: string) => void;
}

const CustomerBooking: React.FC<CustomerBookingProps> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [bookingData, setBookingData] = useState({
    business: '',
    service: '',
    staff: '',
    date: '',
    time: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });

  // Load businesses on component mount
  React.useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const data = await getPublicBusinesses();
      setBusinesses(data);
    } catch (error) {
      console.error('Error loading businesses:', error);
    }
  };

  const loadServices = async (businessId: string) => {
    try {
      const data = await getPublicServices(businessId);
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const loadStaff = async (businessId: string) => {
    try {
      const data = await getPublicStaff(businessId);
      setStaff(data);
    } catch (error) {
      console.error('Error loading staff:', error);
    }
  };

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Load related data when business is selected
    if (field === 'business') {
      loadServices(value);
      loadStaff(value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const selectedService = services.find(s => s.id === bookingData.service);
      const endTime = new Date(`2000-01-01 ${bookingData.time}`);
      endTime.setMinutes(endTime.getMinutes() + (selectedService?.duration_minutes || 60));
      
      await createAppointment({
        business_id: bookingData.business,
        customer_name: bookingData.customerName,
        customer_email: bookingData.customerEmail,
        customer_phone: bookingData.customerPhone,
        staff_id: bookingData.staff,
        service_id: bookingData.service,
        appointment_date: bookingData.date,
        start_time: bookingData.time,
        end_time: endTime.toTimeString().slice(0, 5),
        notes: bookingData.notes,
      });
      
      setStep(5);
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Error creating appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('booking.chooseBusinessTitle')}</h2>
      <div className="grid gap-4">
        {businesses.map((business) => (
          <div
            key={business.id}
            onClick={() => {
              handleInputChange('business', business.id);
              setStep(2);
            }}
            className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
                <p className="text-sm text-gray-600 capitalize">{business.type}</p>
                {business.address && (
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {business.address}
                  </div>
                )}
              </div>
              <div className="text-blue-600">→</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('booking.selectServiceTitle')}</h2>
      <div className="grid gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => {
              handleInputChange('service', service.id);
              setStep(3);
            }}
            className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration_minutes} min
                  </div>
                  <div className="font-medium text-green-600">${service.price}</div>
                </div>
              </div>
              <div className="text-blue-600">→</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('booking.chooseProviderTitle')}</h2>
      <div className="grid gap-4">
        {staff.map((member) => (
          <div
            key={member.id}
            onClick={() => {
              handleInputChange('staff', member.id);
              setStep(4);
            }}
            className="p-6 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.specialties.join(', ')}</p>
              </div>
              <div className="text-blue-600">→</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">{t('booking.selectDateTimeTitle')}</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.selectDate')}</label>
          <input
            type="date"
            value={bookingData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.availableTimes')}</label>
          <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => handleInputChange('time', time)}
                className={`p-3 text-sm border rounded-lg transition-all ${
                  bookingData.time === time
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{t('booking.yourInformation')}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.fullName')}</label>
            <input
              type="text"
              value={bookingData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('booking.fullName')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.email')}</label>
            <input
              type="email"
              value={bookingData.customerEmail}
              onChange={(e) => handleInputChange('customerEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('booking.email')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.phone')}</label>
            <input
              type="tel"
              value={bookingData.customerPhone}
              onChange={(e) => handleInputChange('customerPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('booking.phone')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('booking.specialNotes')}</label>
            <textarea
              value={bookingData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('booking.specialNotes')}
              rows={3}
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!bookingData.date || !bookingData.time || !bookingData.customerName || !bookingData.customerEmail}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {t('booking.bookingAppointment')}
          </>
        ) : (
          t('booking.bookAppointment')
        )}
      </button>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{t('booking.appointmentBooked')}</h2>
      <p className="text-gray-600">{t('booking.successMessage')}</p>
      
      <div className="bg-gray-50 p-6 rounded-lg max-w-md mx-auto text-left">
        <h3 className="font-semibold text-gray-900 mb-4">{t('booking.appointmentDetails')}</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">{t('booking.business')}:</span> {businesses.find(b => b.id === bookingData.business)?.name}</p>
          <p><span className="font-medium">{t('booking.service')}:</span> {services.find(s => s.id === bookingData.service)?.name}</p>
          <p><span className="font-medium">{t('booking.provider')}:</span> {staff.find(s => s.id === bookingData.staff)?.name}</p>
          <p><span className="font-medium">{t('booking.date')}:</span> {bookingData.date}</p>
          <p><span className="font-medium">{t('booking.time')}:</span> {bookingData.time}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          {t('booking.confirmationEmail')} {bookingData.customerEmail}
        </p>
        <button
          onClick={() => onNavigate('landing')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t('booking.returnToHome')}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onNavigate('landing')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step > 1 ? t('booking.back') : t('booking.backToHome')}
          </button>
          
          {step < 5 && (
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <React.Fragment key={i}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {i}
                    </div>
                    {i < 4 && <div className={`w-8 h-1 ${step > i ? 'bg-blue-600' : 'bg-gray-200'}`} />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderConfirmation()}
        </div>
      </div>
    </div>
  );
};

export default CustomerBooking;