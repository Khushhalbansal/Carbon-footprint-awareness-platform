import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container main-content text-center" style={{ paddingTop: '5rem' }}>
          <h1>Oops, something went wrong.</h1>
          <p className="mt-4 mb-4">We're sorry, but an unexpected error occurred.</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.href = '/'}
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
