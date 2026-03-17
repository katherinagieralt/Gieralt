import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '../components/Hero';

// Mock matchMedia for Hero animations
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        language: 'pl',
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  }
}));

// Mock useAnalytics
vi.mock('../components/AnalyticsProvider', () => ({
  useAnalytics: () => ({
    trackEvent: vi.fn(),
  }),
  AnalyticsProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

describe('Hero Component', () => {
  it('renders the Hero component properly', () => {
    render(<Hero />);
    
    // Check main title
    expect(screen.getByText(/Twoja Strona/i)).toBeInTheDocument();
  });
});
