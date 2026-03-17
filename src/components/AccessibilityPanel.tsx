import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  RotateCcw, 
  Type, 
  Contrast, 
  Eye, 
  MousePointer2, 
  Link as LinkIcon, 
  Heading, 
  ZapOff, 
  Layout, 
  Maximize2,
  Minus,
  Plus
} from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';

export function AccessibilityPanel() {
  const { settings, updateSetting, resetSettings, isPanelOpen, setIsPanelOpen } = useAccessibility();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isPanelOpen) {
      // Focus the close button when panel opens
      closeButtonRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsPanelOpen(false);
        
        // Basic focus trap
        if (e.key === 'Tab' && panelRef.current) {
          const focusables = panelRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          const first = focusables[0] as HTMLElement;
          const last = focusables[focusables.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isPanelOpen, setIsPanelOpen]);

  if (!isPanelOpen) return null;

  const sections = [
    {
      title: 'Wizualna personalizacja',
      icon: <Contrast className="w-5 h-5" />,
      controls: [
        {
          label: 'Kontrast',
          type: 'select',
          value: settings.contrast,
          options: [
            { label: 'Normalny', value: 'normal' },
            { label: 'Wysoki', value: 'high' },
            { label: 'Ciemny', value: 'dark' },
            { label: 'Monochromatyczny', value: 'mono' }
          ],
          onChange: (val: any) => updateSetting('contrast', val)
        },
        {
          label: 'Rozmiar czcionki',
          type: 'range',
          value: settings.fontSize,
          min: 100,
          max: 200,
          step: 10,
          unit: '%',
          onChange: (val: number) => updateSetting('fontSize', val)
        },
        {
          label: 'Rodzaj czcionki',
          type: 'select',
          value: settings.fontFamily,
          options: [
            { label: 'Domyślna', value: 'default' },
            { label: 'Bezszeryfowa', value: 'readable' },
            { label: 'Dla dyslektyków', value: 'dyslexic' }
          ],
          onChange: (val: any) => updateSetting('fontFamily', val)
        }
      ]
    },
    {
      title: 'Wsparcie poznawcze',
      icon: <ZapOff className="w-5 h-5" />,
      controls: [
        {
          label: 'Zatrzymaj animacje',
          type: 'toggle',
          value: settings.stopAnimations,
          onChange: (val: boolean) => updateSetting('stopAnimations', val)
        },
        {
          label: 'Maska czytania',
          type: 'toggle',
          value: settings.readingMask,
          onChange: (val: boolean) => updateSetting('readingMask', val)
        },
        {
          label: 'Linia prowadząca',
          type: 'toggle',
          value: settings.readingLine,
          onChange: (val: boolean) => updateSetting('readingLine', val)
        },
        {
          label: 'Tryb minimalistyczny',
          type: 'toggle',
          value: settings.minimalistMode,
          onChange: (val: boolean) => updateSetting('minimalistMode', val)
        }
      ]
    },
    {
      title: 'Nawigacja i Interakcja',
      icon: <MousePointer2 className="w-5 h-5" />,
      controls: [
        {
          label: 'Wizualny Fokus',
          type: 'toggle',
          value: settings.enhancedFocus,
          onChange: (val: boolean) => updateSetting('enhancedFocus', val)
        },
        {
          label: 'Powiększony kursor',
          type: 'toggle',
          value: settings.largeCursor,
          onChange: (val: boolean) => updateSetting('largeCursor', val)
        },
        {
          label: 'Podświetl linki',
          type: 'toggle',
          value: settings.highlightLinks,
          onChange: (val: boolean) => updateSetting('highlightLinks', val)
        },
        {
          label: 'Podświetl nagłówki',
          type: 'toggle',
          value: settings.highlightHeaders,
          onChange: (val: boolean) => updateSetting('highlightHeaders', val)
        }
      ]
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex justify-end pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPanelOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        />
        <motion.div
          ref={panelRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="a11y-panel-title"
          className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl pointer-events-auto flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white font-bold">
                AA
              </div>
              <div>
                <h2 id="a11y-panel-title" className="text-xl font-bold text-slate-900 dark:text-white">Dostępność</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Dostosuj stronę do swoich potrzeb</p>
              </div>
            </div>
            <button 
              ref={closeButtonRef}
              onClick={() => setIsPanelOpen(false)}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Zamknij panel dostępności"
            >
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex items-center gap-2 text-rose-500 font-bold uppercase text-xs tracking-widest">
                  {section.icon}
                  <span>{section.title}</span>
                </div>
                <div className="grid gap-4">
                  {section.controls.map((control, cIdx) => (
                    <div key={cIdx} className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{control.label}</span>
                        {control.type === 'toggle' && (
                          <button
                            onClick={() => control.onChange(!control.value)}
                            aria-pressed={control.value}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                              control.value ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                control.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {control.type === 'range' && (
                        <div className="flex items-center gap-4 mt-2">
                          <button 
                            onClick={() => control.onChange(Math.max(control.min!, control.value - control.step!))}
                            className="p-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-rose-500 transition-all" 
                              style={{ width: `${((control.value - control.min!) / (control.max! - control.min!)) * 100}%` }}
                            />
                          </div>
                          <button 
                            onClick={() => control.onChange(Math.min(control.max!, control.value + control.step!))}
                            className="p-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-bold text-slate-500 min-w-[3rem] text-right">
                            {control.value}{control.unit}
                          </span>
                        </div>
                      )}

                      {control.type === 'select' && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {control.options?.map((opt: any) => (
                            <button
                              key={opt.value}
                              onClick={() => control.onChange(opt.value)}
                              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                                control.value === opt.value
                                  ? 'bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20'
                                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-rose-500/50'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-4">
            <button
              onClick={resetSettings}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-white dark:hover:bg-slate-800 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Resetuj ustawienia
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
