import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FootprintProvider } from '../context/FootprintContext';
import { Dashboard } from './Dashboard';

describe('Dashboard Page', () => {
  it('should render emissions breakdown chart and actionable recommendations', () => {
    render(
      <FootprintProvider>
        <Dashboard />
      </FootprintProvider>
    );

    // Header check
    expect(screen.getByText('Your Impact Dashboard')).toBeInTheDocument();
    
    // Total annual emissions check: Default is 8180 kg CO2
    expect(screen.getByText(/8180 kg CO₂/i)).toBeInTheDocument();

    // Verify SVG PieChart elements are rendered via title tags
    expect(screen.getByText(/Transport: 2080 kg CO₂/i)).toBeInTheDocument();
    expect(screen.getByText(/Diet: 2500 kg CO₂/i)).toBeInTheDocument();
    expect(screen.getByText(/Energy: 3600 kg CO₂/i)).toBeInTheDocument();

    // Check actionable steps are rendered with calculated values
    // Transport savings = 10% of 2080 = 208
    expect(screen.getByText(/Reduce driving by 10% to save ~208 kg CO₂ annually/i)).toBeInTheDocument();
    expect(screen.getByText(/Consider a plant-based meal twice a week to lower dietary impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Switch to LED bulbs and unplug unused appliances/i)).toBeInTheDocument();
  });
});
