import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

interface AccessibilitySettings {
  contrast: 'normal' | 'high' | 'dark' | 'mono';
  fontSize: number; // 100 to 200
  fontFamily: 'default' | 'readable' | 'dyslexic';
  lineHeight: number; // 1 to 2
  letterSpacing: number; // 0 to 0.5
  stopAnimations: boolean;
  readingMask: boolean;
  readingLine: boolean;
  enhancedFocus: boolean;
  largeCursor: boolean;
  highlightLinks: boolean;
  highlightHeaders: boolean;
  minimalistMode: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  resetSettings: () => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
}

const defaultSettings: AccessibilitySettings = {
  contrast: 'normal',
  fontSize: 100,
  fontFamily: 'default',
  lineHeight: 1.5,
  letterSpacing: 0,
  stopAnimations: false,
  readingMask: false,
  readingLine: false,
  enhancedFocus: false,
  largeCursor: false,
  highlightLinks: false,
  highlightHeaders: false,
  minimalistMode: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('accessibility-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const applySettings = (s: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Contrast
    root.classList.remove('a11y-high-contrast', 'a11y-dark-mode', 'a11y-mono');
    if (s.contrast === 'high') root.classList.add('a11y-high-contrast');
    if (s.contrast === 'dark') root.classList.add('a11y-dark-mode');
    if (s.contrast === 'mono') root.classList.add('a11y-mono');

    // Font Size
    root.style.fontSize = `${s.fontSize}%`;

    // Font Family
    root.classList.remove('font-readable', 'font-dyslexic');
    if (s.fontFamily === 'readable') root.classList.add('font-readable');
    if (s.fontFamily === 'dyslexic') root.classList.add('font-dyslexic');

    // Spacing
    root.style.setProperty('--a11y-line-height', s.lineHeight.toString());
    root.style.setProperty('--a11y-letter-spacing', `${s.letterSpacing}em`);

    // Animations
    if (s.stopAnimations) {
      root.classList.add('a11y-stop-animations');
    } else {
      root.classList.remove('a11y-stop-animations');
    }

    // Focus
    if (s.enhancedFocus) {
      root.classList.add('a11y-enhanced-focus');
    } else {
      root.classList.remove('a11y-enhanced-focus');
    }

    // Cursor
    if (s.largeCursor) {
      root.classList.add('a11y-large-cursor');
    } else {
      root.classList.remove('a11y-large-cursor');
    }

    // Highlights
    root.classList.toggle('a11y-highlight-links', s.highlightLinks);
    root.classList.toggle('a11y-highlight-headers', s.highlightHeaders);
    
    // Minimalist
    root.classList.toggle('a11y-minimalist', s.minimalistMode);
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings, isPanelOpen, setIsPanelOpen }}>
      {children}
      {settings.readingMask && <ReadingMask />}
      {settings.readingLine && <ReadingLine />}
    </AccessibilityContext.Provider>
  );
};

const ReadingMask: React.FC = () => {
  const [mousePos, setMousePos] = useState({ y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        setMousePos({ y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[9999] pointer-events-none transition-[background] duration-75 ease-out"
      style={{
        background: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.85) 0%,
          rgba(0, 0, 0, 0.85) calc(${mousePos.y}px - 50px),
          transparent calc(${mousePos.y}px - 50px),
          transparent calc(${mousePos.y}px + 50px),
          rgba(0, 0, 0, 0.85) calc(${mousePos.y}px + 50px),
          rgba(0, 0, 0, 0.85) 100%
        )`
      }}
    >
      {/* Subtle guides at the edges of the mask */}
      <div 
        className="absolute left-0 right-0 h-[1px] bg-rose-500/30"
        style={{ top: `${mousePos.y - 50}px` }}
      />
      <div 
        className="absolute left-0 right-0 h-[1px] bg-rose-500/30"
        style={{ top: `${mousePos.y + 50}px` }}
      />
    </div>
  );
};

const ReadingLine: React.FC = () => {
  const [mousePos, setMousePos] = useState({ y: 0 });
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        setMousePos({ y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div 
      className="fixed left-0 right-0 h-1.5 bg-rose-500 z-[9999] pointer-events-none shadow-[0_0_15px_rgba(229,95,95,0.6)] transition-[top] duration-75 ease-out"
      style={{ top: `${mousePos.y}px` }}
    >
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-500 rounded-full blur-sm opacity-50" />
    </div>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};


