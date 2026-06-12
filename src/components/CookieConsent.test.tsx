import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CookieConsent } from './CookieConsent';
import * as firebaseMod from '../firebase';

vi.mock('../firebase', () => ({
  initializeAnalytics: vi.fn(),
}));

describe('CookieConsent Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders banner when no consent is in localStorage', () => {
    render(<CookieConsent />);
    expect(screen.getByText(/We use strictly necessary cookies/i)).toBeInTheDocument();
  });

  it('does not render banner if consent is true, and initializes analytics', () => {
    localStorage.setItem('ecotrack_analytics_consent', 'true');
    render(<CookieConsent />);
    expect(screen.queryByText(/We use strictly necessary cookies/i)).not.toBeInTheDocument();
    expect(firebaseMod.initializeAnalytics).toHaveBeenCalled();
  });

  it('does not render banner if consent is false, and does not initialize', () => {
    localStorage.setItem('ecotrack_analytics_consent', 'false');
    render(<CookieConsent />);
    expect(screen.queryByText(/We use strictly necessary cookies/i)).not.toBeInTheDocument();
    expect(firebaseMod.initializeAnalytics).not.toHaveBeenCalled();
  });

  it('hides banner and sets localStorage on Accept', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole('button', { name: /Accept Analytics/i }));
    expect(localStorage.getItem('ecotrack_analytics_consent')).toBe('true');
    expect(screen.queryByText(/We use strictly necessary cookies/i)).not.toBeInTheDocument();
    expect(firebaseMod.initializeAnalytics).toHaveBeenCalled();
  });

  it('hides banner and sets localStorage on Decline', () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByRole('button', { name: /Decline/i }));
    expect(localStorage.getItem('ecotrack_analytics_consent')).toBe('false');
    expect(screen.queryByText(/We use strictly necessary cookies/i)).not.toBeInTheDocument();
    expect(firebaseMod.initializeAnalytics).not.toHaveBeenCalled();
  });
});
