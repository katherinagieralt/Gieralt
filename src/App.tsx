import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { AccessibilityProvider } from './components/AccessibilityContext';
import { AnalyticsProvider } from './components/AnalyticsProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProp } from './components/ValueProp';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Offer } from './components/Offer';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FAQ } from './components/FAQ';
import { PearlBackground } from './components/PearlBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { FloatingCTA } from './components/FloatingCTA';
import { AmbientGlow } from './components/AmbientGlow';
import Lenis from 'lenis';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const ErrorBoundary = ({ children, name }: { children: React.ReactNode, name?: string }) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error(`Captured error in ${name || 'unknown'}:`, error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, [name]);

  if (hasError) {
    return (
      <div className="py-12 px-4 text-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl m-4">
        <h2 className="text-xl font-bold mb-2">{t('app.error.sectionFailed', { name })}</h2>
        <p className="text-sm text-zinc-500">{t('app.error.checkConnection')}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenCalendly = () => {
    // Placeholder for Calendly integration
    console.log('Opening Calendly...');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AccessibilityProvider>
          <AnalyticsProvider>
            <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-200 font-sans antialiased">
              <AmbientGlow />
              <PearlBackground />
              <ScrollProgress />
              <Navbar />
              <main>
                <ErrorBoundary name="Hero"><Hero /></ErrorBoundary>
                <ValueProp />
                <ErrorBoundary name="About"><About /></ErrorBoundary>
                <Process />
                <ErrorBoundary name="Offer"><Offer /></ErrorBoundary>
                <ErrorBoundary name="Portfolio"><Portfolio /></ErrorBoundary>
                <ErrorBoundary name="Testimonials"><Testimonials /></ErrorBoundary>
                <FAQ />
                <Contact />
              </main>
              <Footer />
              <FloatingCTA onOpenCalendly={handleOpenCalendly} />
              <AccessibilityPanel />
            </div>
          </AnalyticsProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
