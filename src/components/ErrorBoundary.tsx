import React, { ErrorInfo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-rose-100 dark:border-rose-500/20 text-center">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-8 w-8 text-rose-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Ups! Coś poszło nie tak
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Wystąpił nieoczekiwany błąd aplikacji. Spróbuj odświeżyć stronę lub wróć później.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25"
            >
              <RefreshCw className="h-5 w-5" />
              Odśwież stronę
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-left overflow-auto max-h-40">
                <p className="text-xs font-mono text-rose-500 whitespace-pre-wrap">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
