import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  RotateCcw, 
  Contrast, 
  MousePointer2, 
  ZapOff, 
  Minus,
  Plus
} from 'lucide-react';
import { useAccessibility } from './AccessibilityContext';
import { useTranslation } from 'react-i18next';

export function AccessibilityPanel() {
  const { t } = useTranslation();
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
      title: t('a11y.sections.visual'),
      icon: <Contrast className="w-5 h-5" />,
      controls: [
        {
          label: t('a11y.labels.contrast'),
          type: 'select',
          value: settings.contrast,
          options: [
            { label: t('a11y.options.contrast.normal'), value: 'normal' },
            { label: t('a11y.options.contrast.high'), value: 'high' },
            { label: t('a11y.options.contrast.dark'), value: 'dark' },
            { label: t('a11y.options.contrast.mono'), value: 'mono' }
          ],
          onChange: (val: any) => updateSetting('contrast', val)
        },
        {
          label: t('a11y.labels.fontSize'),
          type: 'range',
          value: settings.fontSize,
          min: 100,
          max: 200,
          step: 10,
          unit: '%',
          onChange: (val: number) => updateSetting('fontSize', val)
        },
        {
          label: t('a11y.labels.fontFamily'),
          type: 'select',
          value: settings.fontFamily,
          options: [
            { label: t('a11y.options.fontFamily.default'), value: 'default' },
            { label: t('a11y.options.fontFamily.readable'), value: 'readable' },
            { label: t('a11y.options.fontFamily.dyslexic'), value: 'dyslexic' }
          ],
          onChange: (val: any) => updateSetting('fontFamily', val)
        }
      ]
    },
    {
      title: t('a11y.sections.cog'),
      icon: <ZapOff className="w-5 h-5" />,
      controls: [
        {
          label: t('a11y.labels.stopAnimations'),
          type: 'toggle',
          value: settings.stopAnimations,
          onChange: (val: boolean) => updateSetting('stopAnimations', val)
        },
        {
          label: t('a11y.labels.readingMask'),
          type: 'toggle',
          value: settings.readingMask,
          onChange: (val: boolean) => updateSetting('readingMask', val)
        },
        {
          label: t('a11y.labels.readingLine'),
          type: 'toggle',
          value: settings.readingLine,
          onChange: (val: boolean) => updateSetting('readingLine', val)
        },
        {
          label: t('a11y.labels.minimalistMode'),
          type: 'toggle',
          value: settings.minimalistMode,
          onChange: (val: boolean) => updateSetting('minimalistMode', val)
        }
      ]
    },
    {
      title: t('a11y.sections.nav'),
      icon: <MousePointer2 className="w-5 h-5" />,
      controls: [
        {
          label: t('a11y.labels.enhancedFocus'),
          type: 'toggle',
          value: settings.enhancedFocus,
          onChange: (val: boolean) => updateSetting('enhancedFocus', val)
        },
        {
          label: t('a11y.labels.largeCursor'),
          type: 'toggle',
          value: settings.largeCursor,
          onChange: (val: boolean) => updateSetting('largeCursor', val)
        },
        {
          label: t('a11y.labels.highlightLinks'),
          type: 'toggle',
          value: settings.highlightLinks,
          onChange: (val: boolean) => updateSetting('highlightLinks', val)
        },
        {
          label: t('a11y.labels.highlightHeaders'),
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
          className="relative w-full max-w-md bg-white dark:bg-zinc-900 h-full shadow-2xl pointer-events-auto flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white font-bold">
                AA
              </div>
              <div>
                <h2 id="a11y-panel-title" className="text-xl font-bold text-zinc-900 dark:text-white">{t('a11y.title')}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('a11y.subtitle')}</p>
              </div>
            </div>
            <button 
              ref={closeButtonRef}
              onClick={() => setIsPanelOpen(false)}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Zamknij panel dostępności"
            >
              <X className="w-6 h-6 text-zinc-500" />
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
                    <div key={cIdx} className="flex flex-col gap-2 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{control.label}</span>
                        {control.type === 'toggle' && (
                          <button
                            onClick={() => control.onChange(!control.value)}
                            aria-pressed={control.value}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                              control.value ? 'bg-rose-500' : 'bg-zinc-300 dark:bg-zinc-700'
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
                            className="p-1 rounded-lg bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 shadow-sm"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-rose-500 transition-all" 
                              style={{ width: `${((control.value - control.min!) / (control.max! - control.min!)) * 100}%` }}
                            />
                          </div>
                          <button 
                            onClick={() => control.onChange(Math.min(control.max!, control.value + control.step!))}
                            className="p-1 rounded-lg bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-bold text-zinc-500 min-w-[3rem] text-right">
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
                                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-rose-500/50'
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
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex gap-4">
            <button
              onClick={resetSettings}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold text-sm hover:bg-white dark:hover:bg-zinc-800 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {t('a11y.reset')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
