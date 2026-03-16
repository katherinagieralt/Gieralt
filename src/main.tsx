import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AnalyticsProvider } from "./components/AnalyticsProvider";
import { ABTestingProvider } from "./components/ABTestingProvider";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import "./i18n";

import { ThemeProvider } from "./components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "dummy-key-for-dev";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
              <AnalyticsProvider gaId="G-DEMO-12345">
                <ABTestingProvider>
                  <App />
                </ABTestingProvider>
              </AnalyticsProvider>
            </GoogleReCaptchaProvider>
          </HelmetProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

// Measure performance only in development
if (import.meta.env.DEV) {
  reportWebVitals(console.log);
}
