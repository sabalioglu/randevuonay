import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.contact': 'Contact',
    'nav.bookAppointment': 'Book Appointment',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    
    // Hero Section
    'hero.title': 'Smart Scheduling for',
    'hero.clinics': 'Clinics',
    'hero.salons': 'Salons',
    'hero.subtitle': 'Streamline your appointment management with AI-powered scheduling, automated reminders, and comprehensive business analytics. Perfect for medical clinics, beauty salons, and wellness centers.',
    'hero.startTrial': 'Start Free Trial',
    'hero.tryDemo': 'Try Demo Booking',
    
    // Features Section
    'features.title': 'Everything You Need to Manage Your Business',
    'features.subtitle': 'Comprehensive tools designed specifically for healthcare and beauty professionals',
    'features.aiAssistant.title': 'AI-Powered Assistant',
    'features.aiAssistant.desc': 'Smart scheduling assistant that handles complex bookings, manages waitlists, and optimizes your calendar automatically.',
    'features.smartScheduling.title': 'Smart Scheduling',
    'features.smartScheduling.desc': 'Intelligent calendar management with conflict detection, automated reminders, and optimal time slot suggestions.',
    'features.multiStaff.title': 'Multi-Staff Management',
    'features.multiStaff.desc': 'Manage multiple practitioners, track their schedules, and assign services based on specializations and availability.',
    'features.analytics.title': 'Business Analytics',
    'features.analytics.desc': 'Comprehensive reports on bookings, revenue, customer retention, and staff performance with actionable insights.',
    'features.hipaa.title': 'HIPAA Compliant',
    'features.hipaa.desc': 'Enterprise-grade security with encrypted data storage, audit trails, and full compliance with healthcare regulations.',
    'features.multiLocation.title': 'Multi-Location Support',
    'features.multiLocation.desc': 'Manage multiple locations from one dashboard with location-specific staff, services, and booking preferences.',
    
    // Footer
    'footer.tagline': 'The complete appointment scheduling solution for healthcare and beauty professionals.',
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.api': 'API',
    'footer.integrations': 'Integrations',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.phone': '1-800-SCHEDULE',
    'footer.email': 'support@schedulepro.com',
    'footer.copyright': '© 2025 SchedulePro. All rights reserved.',
    
    // Login Page
    'login.backToHome': 'Back to Home',
    'login.signInTitle': 'Sign in to your account',
    'login.createAccountTitle': 'Create your business account',
    'login.noAccount': "Don't have an account?",
    'login.signUpHere': 'Sign up here',
    'login.haveAccount': 'Already have an account?',
    'login.signIn': 'Sign in',
    'login.demoAccounts': 'Demo Accounts',
    'login.dentalClinic': 'Dental Clinic',
    'login.beautysalon': 'Beauty Salon',
    'login.spaWellness': 'Spa & Wellness',
    'login.useDemoCredentials': 'Use dental clinic demo credentials',
    'login.firstName': 'First Name',
    'login.lastName': 'Last Name',
    'login.businessName': 'Business Name',
    'login.businessType': 'Business Type',
    'login.medicalClinic': 'Medical Clinic',
    'login.beautySalon': 'Beauty Salon',
    'login.emailAddress': 'Email Address',
    'login.password': 'Password',
    'login.rememberMe': 'Remember me',
    'login.forgotPassword': 'Forgot your password?',
    'login.signingIn': 'Signing In...',
    'login.creatingAccount': 'Creating Account...',
    'login.createAccount': 'Create Account',
    'login.termsText': 'By creating an account, you agree to our',
    'login.termsOfService': 'Terms of Service',
    'login.and': 'and',
    'login.privacyPolicy': 'Privacy Policy',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.aiAssistant': 'AI Assistant',
    'dashboard.overview': 'Overview',
    'dashboard.calendar': 'Calendar',
    'dashboard.customers': 'Customers',
    'dashboard.analytics': 'Analytics',
    'dashboard.settings': 'Settings',
    'dashboard.todaysAppointments': "Today's Appointments",
    'dashboard.thisWeeksRevenue': "This Week's Revenue",
    'dashboard.activeCustomers': 'Active Customers',
    'dashboard.avgRating': 'Avg. Rating',
    'dashboard.fromLastWeek': 'from last week',
    'dashboard.newAppointment': 'New Appointment',
    'dashboard.edit': 'Edit',
    'dashboard.confirmed': 'Confirmed',
    'dashboard.inProgress': 'In Progress',
    'dashboard.pending': 'Pending',
    'dashboard.cancelled': 'Cancelled',
    
    // Customer Booking
    'booking.chooseBusinessTitle': 'Choose a Business',
    'booking.selectServiceTitle': 'Select a Service',
    'booking.chooseProviderTitle': 'Choose Your Provider',
    'booking.selectDateTimeTitle': 'Select Date & Time',
    'booking.selectDate': 'Select Date',
    'booking.availableTimes': 'Available Times',
    'booking.yourInformation': 'Your Information',
    'booking.fullName': 'Full Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone',
    'booking.specialNotes': 'Special Notes (Optional)',
    'booking.bookAppointment': 'Book Appointment',
    'booking.bookingAppointment': 'Booking Appointment...',
    'booking.appointmentBooked': 'Appointment Booked!',
    'booking.successMessage': 'Your appointment has been successfully scheduled.',
    'booking.appointmentDetails': 'Appointment Details',
    'booking.business': 'Business',
    'booking.service': 'Service',
    'booking.provider': 'Provider',
    'booking.date': 'Date',
    'booking.time': 'Time',
    'booking.confirmationEmail': 'A confirmation email has been sent to',
    'booking.returnToHome': 'Return to Home',
    'booking.back': 'Back',
    'booking.backToHome': 'Back to Home',
    
    // AI Assistant
    'ai.title': 'AI Assistant',
    'ai.backToDashboard': 'Back to Dashboard',
    'ai.online': 'Online',
    'ai.placeholder': 'Ask me about appointments, services, or anything else...',
    'ai.sendHint': 'Press Enter to send, Shift+Enter for new line',
    'ai.capabilities': 'AI Assistant Capabilities',
    'ai.capabilitiesDesc': 'I can help with booking appointments, checking availability, providing service information, and handling cancellations. For urgent medical concerns, please call our emergency line or visit the nearest emergency room.',
    'ai.greeting': "Hello! I'm your AI scheduling assistant. I can help you book, modify, or cancel appointments. I can also check availability, provide service information, and answer questions about your clinic or salon. How can I assist you today?"
  },
  tr: {
    // Navigation
    'nav.features': 'Özellikler',
    'nav.contact': 'İletişim',
    'nav.bookAppointment': 'Randevu Al',
    'nav.signIn': 'Giriş Yap',
    'nav.getStarted': 'Başlayın',
    
    // Hero Section
    'hero.title': 'Akıllı Randevu Sistemi',
    'hero.clinics': 'Klinikler',
    'hero.salons': 'Salonlar',
    'hero.subtitle': 'AI destekli randevu yönetimi, otomatik hatırlatmalar ve kapsamlı iş analitiği ile randevu süreçlerinizi kolaylaştırın. Tıp klinikleri, güzellik salonları ve wellness merkezleri için mükemmel.',
    'hero.startTrial': 'Ücretsiz Deneme',
    'hero.tryDemo': 'Demo Randevu Deneyin',
    
    // Features Section
    'features.title': 'İşinizi Yönetmek İçin İhtiyacınız Olan Her Şey',
    'features.subtitle': 'Sağlık ve güzellik profesyonelleri için özel olarak tasarlanmış kapsamlı araçlar',
    'features.aiAssistant.title': 'AI Destekli Asistan',
    'features.aiAssistant.desc': 'Karmaşık rezervasyonları yöneten, bekleme listelerini yöneten ve takviminizi otomatik olarak optimize eden akıllı randevu asistanı.',
    'features.smartScheduling.title': 'Akıllı Randevu Sistemi',
    'features.smartScheduling.desc': 'Çakışma tespiti, otomatik hatırlatmalar ve optimal zaman dilimi önerileri ile akıllı takvim yönetimi.',
    'features.multiStaff.title': 'Çoklu Personel Yönetimi',
    'features.multiStaff.desc': 'Birden fazla uygulayıcıyı yönetin, programlarını takip edin ve uzmanlık alanları ile müsaitlik durumuna göre hizmet ataması yapın.',
    'features.analytics.title': 'İş Analitiği',
    'features.analytics.desc': 'Rezervasyonlar, gelir, müşteri sadakati ve personel performansı hakkında eyleme dönüştürülebilir içgörüler içeren kapsamlı raporlar.',
    'features.hipaa.title': 'HIPAA Uyumlu',
    'features.hipaa.desc': 'Şifrelenmiş veri depolama, denetim izleri ve sağlık düzenlemeleriyle tam uyumluluk ile kurumsal düzeyde güvenlik.',
    'features.multiLocation.title': 'Çoklu Lokasyon Desteği',
    'features.multiLocation.desc': 'Lokasyona özel personel, hizmetler ve rezervasyon tercihleri ile birden fazla lokasyonu tek panelden yönetin.',
    
    // Footer
    'footer.tagline': 'Sağlık ve güzellik profesyonelleri için eksiksiz randevu planlama çözümü.',
    'footer.product': 'Ürün',
    'footer.features': 'Özellikler',
    'footer.api': 'API',
    'footer.integrations': 'Entegrasyonlar',
    'footer.company': 'Şirket',
    'footer.about': 'Hakkımızda',
    'footer.blog': 'Blog',
    'footer.careers': 'Kariyer',
    'footer.contact': 'İletişim',
    'footer.phone': '1-800-SCHEDULE',
    'footer.email': 'destek@schedulepro.com',
    'footer.copyright': '© 2025 SchedulePro. Tüm hakları saklıdır.',
    
    // Login Page
    'login.backToHome': 'Ana Sayfaya Dön',
    'login.signInTitle': 'Hesabınıza giriş yapın',
    'login.createAccountTitle': 'İş hesabınızı oluşturun',
    'login.noAccount': 'Hesabınız yok mu?',
    'login.signUpHere': 'Buradan kaydolun',
    'login.haveAccount': 'Zaten hesabınız var mı?',
    'login.signIn': 'Giriş Yap',
    'login.demoAccounts': 'Demo Hesapları',
    'login.dentalClinic': 'Diş Kliniği',
    'login.beautysalon': 'Güzellik Salonu',
    'login.spaWellness': 'Spa & Wellness',
    'login.useDemoCredentials': 'Diş kliniği demo bilgilerini kullan',
    'login.firstName': 'Ad',
    'login.lastName': 'Soyad',
    'login.businessName': 'İşletme Adı',
    'login.businessType': 'İşletme Türü',
    'login.medicalClinic': 'Tıp Kliniği',
    'login.beautySalon': 'Güzellik Salonu',
    'login.emailAddress': 'E-posta Adresi',
    'login.password': 'Şifre',
    'login.rememberMe': 'Beni hatırla',
    'login.forgotPassword': 'Şifrenizi mi unuttunuz?',
    'login.signingIn': 'Giriş yapılıyor...',
    'login.creatingAccount': 'Hesap oluşturuluyor...',
    'login.createAccount': 'Hesap Oluştur',
    'login.termsText': 'Hesap oluşturarak',
    'login.termsOfService': 'Hizmet Şartlarımızı',
    'login.and': 've',
    'login.privacyPolicy': 'Gizlilik Politikamızı',
    
    // Dashboard
    'dashboard.welcome': 'Hoş geldiniz',
    'dashboard.aiAssistant': 'AI Asistan',
    'dashboard.overview': 'Genel Bakış',
    'dashboard.calendar': 'Takvim',
    'dashboard.customers': 'Müşteriler',
    'dashboard.analytics': 'Analitik',
    'dashboard.settings': 'Ayarlar',
    'dashboard.todaysAppointments': 'Bugünün Randevuları',
    'dashboard.thisWeeksRevenue': 'Bu Haftanın Geliri',
    'dashboard.activeCustomers': 'Aktif Müşteriler',
    'dashboard.avgRating': 'Ort. Puan',
    'dashboard.fromLastWeek': 'geçen haftadan',
    'dashboard.newAppointment': 'Yeni Randevu',
    'dashboard.edit': 'Düzenle',
    'dashboard.confirmed': 'Onaylandı',
    'dashboard.inProgress': 'Devam Ediyor',
    'dashboard.pending': 'Beklemede',
    'dashboard.cancelled': 'İptal Edildi',
    
    // Customer Booking
    'booking.chooseBusinessTitle': 'Bir İşletme Seçin',
    'booking.selectServiceTitle': 'Bir Hizmet Seçin',
    'booking.chooseProviderTitle': 'Hizmet Sağlayıcınızı Seçin',
    'booking.selectDateTimeTitle': 'Tarih ve Saat Seçin',
    'booking.selectDate': 'Tarih Seçin',
    'booking.availableTimes': 'Müsait Saatler',
    'booking.yourInformation': 'Bilgileriniz',
    'booking.fullName': 'Ad Soyad',
    'booking.email': 'E-posta',
    'booking.phone': 'Telefon',
    'booking.specialNotes': 'Özel Notlar (İsteğe Bağlı)',
    'booking.bookAppointment': 'Randevu Al',
    'booking.bookingAppointment': 'Randevu alınıyor...',
    'booking.appointmentBooked': 'Randevu Alındı!',
    'booking.successMessage': 'Randevunuz başarıyla planlandı.',
    'booking.appointmentDetails': 'Randevu Detayları',
    'booking.business': 'İşletme',
    'booking.service': 'Hizmet',
    'booking.provider': 'Hizmet Sağlayıcı',
    'booking.date': 'Tarih',
    'booking.time': 'Saat',
    'booking.confirmationEmail': 'Onay e-postası gönderildi:',
    'booking.returnToHome': 'Ana Sayfaya Dön',
    'booking.back': 'Geri',
    'booking.backToHome': 'Ana Sayfaya Dön',
    
    // AI Assistant
    'ai.title': 'AI Asistan',
    'ai.backToDashboard': 'Panele Dön',
    'ai.online': 'Çevrimiçi',
    'ai.placeholder': 'Randevular, hizmetler veya başka bir şey hakkında bana sorun...',
    'ai.sendHint': 'Göndermek için Enter, yeni satır için Shift+Enter',
    'ai.capabilities': 'AI Asistan Yetenekleri',
    'ai.capabilitiesDesc': 'Randevu alma, müsaitlik kontrolü, hizmet bilgileri sağlama ve iptal işlemleri konularında yardımcı olabilirim. Acil tıbbi durumlar için lütfen acil servis hattımızı arayın veya en yakın acil servise başvurun.',
    'ai.greeting': 'Merhaba! Ben sizin AI randevu asistanınızım. Randevu alma, değiştirme veya iptal etme konularında yardımcı olabilirim. Ayrıca müsaitlik kontrolü, hizmet bilgileri sağlama ve kliniğiniz veya salonunuz hakkındaki soruları yanıtlayabilirim. Bugün size nasıl yardımcı olabilirim?'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr'); // Default to Turkish

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};