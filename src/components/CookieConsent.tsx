import { useState, useEffect } from 'react';
import { initializeAnalytics } from '../firebase';

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(() => {
    return localStorage.getItem('ecotrack_analytics_consent') === null;
  });

  useEffect(() => {
    const consent = localStorage.getItem('ecotrack_analytics_consent');
    if (consent === 'true') {
      initializeAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ecotrack_analytics_consent', 'true');
    setShowBanner(false);
    initializeAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem('ecotrack_analytics_consent', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--glass-bg)] border-t border-[var(--glass-border)] z-50 animate-fade-in" style={{ backdropFilter: 'var(--glass-blur)' }}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use strictly necessary cookies to keep your data saved locally. With your consent, we also use Google Analytics to understand how our tool is used and improve the experience.
        </p>
        <div className="flex items-center gap-4 whitespace-nowrap">
          <button onClick={handleDecline} className="btn" style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}>
            Decline
          </button>
          <button onClick={handleAccept} className="btn btn-primary">
            Accept Analytics
          </button>
        </div>
      </div>
    </div>
  );
};
