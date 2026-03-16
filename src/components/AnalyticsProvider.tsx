import { createContext, useContext, useEffect, ReactNode } from 'react';

interface AnalyticsContextType {
  trackEvent: (eventName: string, params?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

interface Props {
  children: ReactNode;
  gaId?: string;
}

export function AnalyticsProvider({ children, gaId = "G-XXXXXXXXXX" }: Props) {
  useEffect(() => {
    if (!gaId || gaId === "G-XXXXXXXXXX") return;

    // Inject GA4 script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script.async = true;
    document.head.appendChild(script);
    
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]){(window as any).dataLayer.push(args);}
    gtag('js', new Date());
    gtag('config', gaId);
  }, [gaId]);

  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    } else {
      console.log(`[Analytics] Event: ${eventName}`, params);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}
