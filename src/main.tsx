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

const recaptchaKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || "dummy-key-for-dev";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <GoogleReCaptchaProvider reCaptchaKey={recaptchaKey}>
            <AnalyticsProvider gaId="G-DEMO-12345">
              <ABTestingProvider>
                <App />
              </ABTestingProvider>
            </AnalyticsProvider>
          </GoogleReCaptchaProvider>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
