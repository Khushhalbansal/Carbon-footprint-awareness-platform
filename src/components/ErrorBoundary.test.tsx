import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children if no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Safe</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders fallback UI when error is thrown', () => {
    const ProblemChild = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops, something went wrong.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Return to Home/i })).toBeInTheDocument();
  });
});
