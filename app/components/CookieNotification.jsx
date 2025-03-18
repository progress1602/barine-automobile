'use client';

import { useState, useEffect } from 'react';

export default function CookieNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookiesConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const cookiePreferences = {
      consent: 'accepted',
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookiesConsent', JSON.stringify(cookiePreferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const cookiePreferences = {
      consent: 'rejected',
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookiesConsent', JSON.stringify(cookiePreferences));
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    const cookiePreferences = {
      consent: 'custom',
      essential: true,
      analytics: preferences.analytics,
      marketing: preferences.marketing,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookiesConsent', JSON.stringify(cookiePreferences));
    setIsVisible(false);
    setShowCustomize(false);
  };

  const handleClose = () => {
    const cookiePreferences = {
      consent: 'closed',
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cookiesConsent', JSON.stringify(cookiePreferences));
    setIsVisible(false);
  };

  const togglePreference = (type) => {
    if (type !== 'essential') {
      setPreferences(prev => ({
        ...prev,
        [type]: !prev[type]
      }));
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`
        fixed bg-gray-400 rounded-sm flex items-end justify-end 
        bottom-4 right-4 max-w-md z-50
        animate-slide-up
      `}
    >
      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>

      <div className="p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 text-white transition-colors hover:text-gray-200"
          aria-label="Close cookie notification"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleAcceptAll}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 transform hover:scale-105"
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleRejectAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 transform hover:scale-105"
          >
            Reject All Cookies
          </button>
        
          {showCustomize && (
            <button
              onClick={handleSaveCustom}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 transform hover:scale-105"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}