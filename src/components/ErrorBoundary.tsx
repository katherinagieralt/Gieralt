import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // Tutaj można dodać integrację z usługą logowania błędów (np. Sentry)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-[400px] w-full flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto border border-red-200 dark:border-red-500/20 shadow-sm">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-semibold text-slate-900 dark:text-white">Coś poszło nie tak</h2>
              <p className="text-slate-600 dark:text-slate-400 font-light">
                Wystąpił nieoczekiwany błąd aplikacji. Spróbuj odświeżyć stronę lub wrócić później.
              </p>
            </div>
            {this.state.error && (
              <div className="text-left bg-slate-100 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <code className="text-xs text-red-600 dark:text-red-400 break-all font-mono">
                  {this.state.error.message}
                </code>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button 
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold transition-all hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg shadow-slate-900/10"
              >
                <RefreshCcw className="w-4 h-4" />
                Spróbuj ponownie
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-bold border border-slate-200 dark:border-slate-700 transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
              >
                Odśwież stronę
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
