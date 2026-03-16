import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, X } from 'lucide-react';
import { useState } from 'react';

/**
 * PWAUpdatePrompt — shows a banner when a new Service Worker is available,
 * letting the user update immediately without losing state.
 */
export function PWAUpdatePrompt() {
  const [dismissed, setDismissed] = useState(false);

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        // Check for updates every 60 minutes
        setInterval(() => r.update(), 60 * 60 * 1000);
      }
    },
  });

  const handleUpdate = () => {
    updateServiceWorker(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  const show = needRefresh && !dismissed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-2xl shadow-2xl border border-slate-800 dark:border-slate-200 max-w-sm w-full mx-4"
          role="alert"
        >
          <div className="flex-1">
            <p className="text-sm font-semibold">Dostępna aktualizacja 🎉</p>
            <p className="text-xs opacity-60 mt-0.5">Kliknij aby odświeżyć do nowej wersji</p>
          </div>
          <button
            onClick={handleUpdate}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition-colors shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Aktualizuj
          </button>
          <button
            onClick={handleDismiss}
            className="p-1 opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Zamknij"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
