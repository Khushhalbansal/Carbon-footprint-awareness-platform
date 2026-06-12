import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('should render brand name and all navigation links', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Brand name check
    expect(screen.getByText('EcoTrack')).toBeInTheDocument();

    // Nav links check
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Calculator')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('should toggle theme from dark to light on button click', () => {
    // Initial setup: document.documentElement starts with data-theme="dark" (default)
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Click theme toggle button
    const toggleBtn = screen.getByRole('button', { name: /Switch to light mode/i });
    fireEvent.click(toggleBtn);

    // Verify it changes to light mode
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    // Toggle button should now show "Switch to dark mode"
    expect(screen.getByRole('button', { name: /Switch to dark mode/i })).toBeInTheDocument();
    
    // Toggle back to dark
    fireEvent.click(screen.getByRole('button', { name: /Switch to dark mode/i }));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
