import { useState, Suspense, lazy, ReactNode } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ImpactSection } from "./ImpactSection";
import { HumanInTheLoop } from "./HumanInTheLoop";
import { Loader2 } from "lucide-react";
import { SEO } from "./SEO";
import { ScrollProgress } from "./ScrollProgress";
import { FloatingCTA } from "./FloatingCTA";
import { About } from "./About";
import { PersonalizedGreeting } from "./PersonalizedGreeting";
import { useEffect } from "react";

// Lazy load heavy components
const Process = lazy(() => import("./Process").then(module => ({ default: module.Process })));
const Portfolio = lazy(() => import("./Portfolio").then(module => ({ default: module.Portfolio })));
const Testimonials = lazy(() => import("./Testimonials").then(module => ({ default: module.Testimonials })));
const Pricing = lazy(() => import("./Pricing").then(module => ({ default: module.Pricing })));
const FAQ = lazy(() => import("./FAQ").then(module => ({ default: module.FAQ })));
const Contact = lazy(() => import("./Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./Footer").then(module => ({ default: module.Footer })));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy").then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import("./TermsOfService").then(module => ({ default: module.TermsOfService })));
const CookieBanner = lazy(() => import("./CookieBanner").then(module => ({ default: module.CookieBanner })));
const CalendlyModal = lazy(() => import("./CalendlyModal").then(module => ({ default: module.CalendlyModal })));
const ExitIntentPopup = lazy(() => import("./ExitIntentPopup").then(module => ({ default: module.ExitIntentPopup })));

function LoadingFallback() {
  return (
    <div className="py-16 flex justify-center items-center">
      <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
    </div>
  );
}

function Section({ children, className = "", id, fullHeight = true }: { children: ReactNode, className?: string, id?: string, fullHeight?: boolean }) {
  return (
    <div id={id} className={`${fullHeight ? 'min-h-screen' : ''} flex flex-col justify-center ${className}`}>
      {children}
    </div>
  );
}

export function LandingPage() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            const behaviorStr = localStorage.getItem("user_behavior");
            const behavior = behaviorStr ? JSON.parse(behaviorStr) : { visitedSections: [], lastVisit: new Date().toISOString() };
            
            if (!behavior.visitedSections.includes(entry.target.id)) {
              behavior.visitedSections.push(entry.target.id);
              localStorage.setItem("user_behavior", JSON.stringify(behavior));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id], div[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content" className="relative min-h-screen bg-transparent">
      <SEO 
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Katarzyna Gierałt",
          "jobTitle": "UX/UI Designer & AI Expert",
          "url": "https://katarzynagieralt.pl",
          "sameAs": [
            "https://www.linkedin.com/in/katarzynagieralt",
            "https://behance.net/katarzynagieralt"
          ],
          "description": "Projektuję nowoczesne interfejsy i wdrażam rozwiązania AI, które pomagają firmom rosnąć."
        }}
      />
      <ScrollProgress />
      <Header onOpenCalendly={() => setIsCalendlyOpen(true)} />
      
      <Section className="bg-transparent" fullHeight={false} id="hero">
        <Hero />
      </Section>
      
      <ImpactSection />
      
      <Section className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md" id="about">
        <About />
      </Section>
      
      <Section className="bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-md" id="human-in-the-loop">
        <HumanInTheLoop />
      </Section>
      
      <Suspense fallback={<LoadingFallback />}>
        <Section className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md" id="process">
          <Process />
        </Section>
        
        <Section className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md" id="portfolio">
          <Portfolio />
        </Section>
        
        <Section className="bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-md" id="testimonials">
          <Testimonials />
        </Section>
        
        <Section className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md" id="pricing">
          <Pricing />
        </Section>
        
        <Section className="bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-md" id="faq">
          <FAQ />
        </Section>
        
        <Section className="bg-white/60 dark:bg-slate-950/60 backdrop-blur-md" id="contact">
          <Contact />
        </Section>
        
        <div>
          <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} onOpenTerms={() => setIsTermsOpen(true)} />
        </div>
        
        <PrivacyPolicy isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <TermsOfService isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        <CalendlyModal isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
        <CookieBanner />
        <FloatingCTA onOpenCalendly={() => setIsCalendlyOpen(true)} />
        <ExitIntentPopup />
        <PersonalizedGreeting />
      </Suspense>
    </main>
  );
}
