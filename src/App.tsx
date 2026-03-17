import React, { useState, useEffect } from 'react';

// Import Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactSection } from './components/ImpactSection';
import { About } from './components/About';
import { AIHuman } from './components/AIHuman';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Design System Components
import { ThemeProvider } from './components/ThemeProvider';
import { AccessibilityProvider } from './components/AccessibilityContext';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import { PearlBackground } from './components/PearlBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { FloatingCTA } from './components/FloatingCTA';

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Caught by ErrorBoundary:', event.error);
      setHasError(true);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Ups! Coś poszło nie tak.</h1>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-rose-500 rounded-full font-bold"
          >
            Odśwież stronę
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default function App() {
  const handleOpenCalendly = () => {
    // Placeholder for Calendly integration
    console.log('Opening Calendly...');
  };

  return (
    <ErrorBoundary>
      <AnalyticsProvider>
        <ThemeProvider>
          <AccessibilityProvider>
            <div className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200 font-sans antialiased selection:bg-rose-500 selection:text-white">
              <PearlBackground />
              <ScrollProgress />
              <Navbar />
              <main>
                <Hero />
                <ImpactSection />
                <About />
                <AIHuman />
                <Process />
                <Portfolio />
                <Testimonials />
                <Pricing />
                <FAQ />
                <Contact />
              </main>
              <Footer />
              <FloatingCTA onOpenCalendly={handleOpenCalendly} />
              <AccessibilityPanel />
            </div>
          </AccessibilityProvider>
        </ThemeProvider>
      </AnalyticsProvider>
    </ErrorBoundary>
  );
}
