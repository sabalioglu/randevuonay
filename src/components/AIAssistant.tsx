import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, ArrowLeft, User, Bot, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface AIAssistantProps {
  onNavigate: (view: string) => void;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
    data?: any;
  }>;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI scheduling assistant. I can help you book, modify, or cancel appointments. I can also check availability, provide service information, and answer questions about your clinic or salon. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Appointment booking
    if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I\'d be happy to help you book an appointment! Let me gather some information:\n\n1. What type of service are you looking for?\n2. Do you have a preferred date and time?\n3. Any specific staff member you\'d like to see?\n\nI can check real-time availability and find the best slot that works for you.',
        timestamp: new Date(),
        actions: [
          { label: 'Check Availability', action: 'check_availability' },
          { label: 'View Services', action: 'view_services' }
        ]
      };
    }
    
    // Availability check
    if (lowerMessage.includes('available') || lowerMessage.includes('availability')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Let me check our current availability for you:\n\n**Today\'s Available Slots:**\n• 2:30 PM - Dr. Johnson (30 min)\n• 3:15 PM - Dr. Smith (45 min)\n• 4:00 PM - Dr. Brown (60 min)\n\n**Tomorrow:**\n• 9:00 AM - Dr. Johnson (60 min)\n• 10:30 AM - Dr. Smith (30 min)\n• 2:00 PM - Dr. Brown (45 min)\n\nWould you like me to book one of these slots for you?',
        timestamp: new Date(),
        actions: [
          { label: 'Book 2:30 PM Today', action: 'book_appointment', data: { time: '2:30 PM', date: 'today' } },
          { label: 'Book 9:00 AM Tomorrow', action: 'book_appointment', data: { time: '9:00 AM', date: 'tomorrow' } }
        ]
      };
    }
    
    // Cancellation
    if (lowerMessage.includes('cancel') || lowerMessage.includes('reschedule')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'I can help you cancel or reschedule an appointment. Please provide:\n\n• Your name or appointment confirmation number\n• The date of the appointment you want to modify\n\n**Current Cancellation Policy:**\n• 24 hours notice required for full refund\n• 12-24 hours: 50% cancellation fee\n• Less than 12 hours: Full charge applies\n\nWhat appointment would you like to modify?',
        timestamp: new Date()
      };
    }
    
    // Services inquiry
    if (lowerMessage.includes('service') || lowerMessage.includes('treatment') || lowerMessage.includes('price')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: 'Here are our available services:\n\n**Dental Services:**\n• Routine Cleaning - 60 min - $120\n• Comprehensive Exam - 30 min - $80\n• Teeth Whitening - 90 min - $200\n• Dental Filling - 45 min - $150\n• Root Canal - 90 min - $400\n\n**Additional Services:**\n• Emergency Consultations\n• Cosmetic Consultations\n• Oral Surgery Referrals\n\nWhich service interests you? I can provide more details and check availability.',
        timestamp: new Date(),
        actions: [
          { label: 'Book Cleaning', action: 'book_service', data: { service: 'cleaning' } },
          { label: 'Book Exam', action: 'book_service', data: { service: 'exam' } }
        ]
      };
    }
    
    // Hours inquiry
    if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('closed')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: '**Business Hours:**\n\n• Monday - Friday: 8:00 AM - 6:00 PM\n• Saturday: 9:00 AM - 3:00 PM\n• Sunday: Closed\n\n**Emergency Hours:**\n• After-hours emergency line available\n• Weekend emergency appointments by arrangement\n\n**Holiday Schedule:**\n• We\'re closed on major holidays\n• Modified hours during holiday weeks\n\nIs there a specific time you\'d like to schedule an appointment?',
        timestamp: new Date()
      };
    }
    
    // Preparation instructions
    if (lowerMessage.includes('prepare') || lowerMessage.includes('before') || lowerMessage.includes('what to bring')) {
      return {
        id: Date.now().toString(),
        type: 'assistant',
        content: '**Appointment Preparation:**\n\n**What to Bring:**\n• Photo ID\n• Insurance card\n• List of current medications\n• Previous dental records (if new patient)\n\n**Before Your Visit:**\n• Arrive 15 minutes early\n• Complete new patient forms online\n• Avoid eating 2 hours before certain procedures\n• Bring payment method for co-pays\n\n**Special Instructions:**\n• Wear comfortable clothing\n• Remove contact lenses if needed\n• Inform us of any anxiety or medical conditions\n\nDo you have any specific concerns about your upcoming appointment?',
        timestamp: new Date()
      };
    }
    
    // Default helpful response
    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: 'I understand you\'re looking for assistance. I can help you with:\n\n• **Booking new appointments** - Find available times and book instantly\n• **Checking availability** - See real-time open slots\n• **Modifying appointments** - Reschedule or cancel existing bookings\n• **Service information** - Details about treatments, duration, and pricing\n• **Preparation guidance** - What to expect and how to prepare\n• **Business hours and policies** - Operating hours and important policies\n\nWhat would you like help with today? Feel free to ask me anything about scheduling or our services!',
      timestamp: new Date(),
      actions: [
        { label: 'Book Appointment', action: 'book_appointment' },
        { label: 'Check Availability', action: 'check_availability' },
        { label: 'View Services', action: 'view_services' }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (action: string, data?: any) => {
    let responseMessage = '';
    
    switch (action) {
      case 'book_appointment':
        responseMessage = 'Perfect! I\'m initiating the booking process for you. Let me gather a few more details to complete your appointment.';
        break;
      case 'check_availability':
        responseMessage = 'Let me check our current availability...';
        break;
      case 'view_services':
        responseMessage = 'Here\'s our complete service menu with current pricing...';
        break;
      default:
        responseMessage = 'I\'m processing your request...';
    }
    
    const actionMessage: Message = {
      id: Date.now().toString(),
      type: 'assistant',
      content: responseMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, actionMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </button>
            
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Assistant</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg p-4 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    
                    {message.actions && (
                      <div className="mt-3 space-y-2">
                        {message.actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleActionClick(action.action, action.data)}
                            className="block w-full text-left px-3 py-2 bg-white text-gray-700 rounded border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about appointments, services, or anything else..."
                className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
        
        {/* Assistant Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">AI Assistant Capabilities</p>
              <p>I can help with booking appointments, checking availability, providing service information, and handling cancellations. For urgent medical concerns, please call our emergency line or visit the nearest emergency room.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;