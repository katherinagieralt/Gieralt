/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { Toaster } from "react-hot-toast";
import { PearlBackground } from "./components/PearlBackground";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { AccessibilityPanel } from "./components/AccessibilityPanel";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { OfflineBanner } from "./components/OfflineBanner";
import { PWAUpdatePrompt } from "./components/PWAUpdatePrompt";
import { Loader2 } from "lucide-react";

// Lazy-loaded components (splits the bundle and improves load time drastically)
const LandingPage = lazy(() => import("./components/LandingPage").then(mod => ({ default: mod.LandingPage })));
const Login = lazy(() => import("./components/Login").then(mod => ({ default: mod.Login })));
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then(mod => ({ default: mod.AdminDashboard })));
const AdminClients = lazy(() => import("./components/AdminClients").then(mod => ({ default: mod.AdminClients })));
const ProjectDetail = lazy(() => import("./components/ProjectDetail").then(mod => ({ default: mod.ProjectDetail })));
const ThankYou = lazy(() => import("./components/ThankYou").then(mod => ({ default: mod.ThankYou })));
const CaseStudyPage = lazy(() => import("./components/CaseStudyPage").then(mod => ({ default: mod.CaseStudyPage })));
const ClientLogin = lazy(() => import("./components/ClientLogin").then(mod => ({ default: mod.ClientLogin })));
const ClientPortal = lazy(() => import("./components/ClientPortal").then(mod => ({ default: mod.ClientPortal })));

function GlobalLoader() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-transparent">
      <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
    </div>
  );
}

const CookieBanner = lazy(() => import("./components/CookieBanner").then(mod => ({ default: mod.CookieBanner })));
const NotFound = lazy(() => import("./components/NotFound").then(mod => ({ default: mod.NotFound })));

export default function App() {
  return (
    <ErrorBoundary>
      <AccessibilityProvider>
        <MotionConfig reducedMotion="user">
          <BrowserRouter>
            <OfflineBanner />
            <PWAUpdatePrompt />
            <Toaster position="top-right" />
            <PearlBackground />
            <AccessibilityPanel />
            <Suspense fallback={<GlobalLoader />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/clients" element={<AdminClients />} />
                <Route path="/portfolio/:id" element={<ProjectDetail />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/case-study/:id" element={<CaseStudyPage />} />
                <Route path="/client/login" element={<ClientLogin />} />
                <Route path="/client" element={<ClientPortal />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <CookieBanner />
            </Suspense>
          </BrowserRouter>
        </MotionConfig>
      </AccessibilityProvider>
    </ErrorBoundary>
  );
}
