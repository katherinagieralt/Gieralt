import { useEffect, useState } from "react";
import { WifiOff, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-center gap-3 bg-amber-500 text-white px-4 py-3 shadow-lg text-sm font-semibold"
          role="alert"
          aria-live="assertive"
        >
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Brak połączenia z internetem — część treści może być niedostępna</span>
          <button
            onClick={() => window.location.reload()}
            className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-xs font-bold"
          >
            <RefreshCw className="w-3 h-3" />
            Odśwież
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
