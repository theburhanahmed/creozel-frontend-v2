import React, { Component } from 'react';
import { Button } from './Button';
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }
  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service
    console.error('Error caught by boundary:', error, errorInfo);
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    this.setState({
      error,
      errorInfo
    });
  }
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };
  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }
      // Default error UI
      return <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#0A0E14] p-4">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <AlertTriangleIcon size={32} className="text-red-500" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
                We encountered an unexpected error. Don't worry, your data is
                safe.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && <details className="mb-6 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Error Details (Development Only)
                  </summary>
                  <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="primary" className="flex-1 justify-center" leftIcon={<RefreshCwIcon size={18} />} onClick={this.handleReset}>
                  Try Again
                </Button>
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full justify-center" leftIcon={<HomeIcon size={18} />}>
                    Go Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>;
    }
    return this.props.children;
  }
}