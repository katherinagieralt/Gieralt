import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export function Login() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(location.state?.error || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.error) {
      setError(location.state.error);
      // Clear state so it doesn't persist on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (err) {
      console.error("Login failed", err);
      setError("Logowanie nie powiodło się. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-rose-500/10 dark:bg-rose-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 text-center shadow-2xl shadow-rose-500/5 relative z-10"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-100 dark:border-rose-500/20 shadow-sm">
            <svg className="w-8 h-8 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-display font-semibold text-slate-900 dark:text-white mb-3">Panel <span className="text-gradient">Administratora</span></h1>
          <p className="text-slate-700 dark:text-slate-300 font-light">Zaloguj się, aby zarządzać zgłoszeniami i projektami.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-70 text-slate-700 dark:text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
          ) : (
            <div className="bg-white rounded-full p-1 shadow-sm border border-slate-100 dark:border-none group-hover:scale-110 transition-transform">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
          )}
          <span className="tracking-wide">Zaloguj przez Google</span>
        </button>
        
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-slate-500 hover:text-rose-500 transition-colors font-medium"
          >
            &larr; Wróć na stronę główną
          </button>
        </div>
      </motion.div>
    </div>
  );
}
