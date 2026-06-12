import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FootprintProvider } from '../context/FootprintContext';
import { Dashboard } from './Dashboard';

// Mock recharts because ResponsiveContainer & PieChart require DOM measurements that jsdom does not support
vi.mock('recharts', () => {
  const OriginalRecharts = vi.importActual('recharts');
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: any) => <div data-testid="recharts-container">{children}</div>,
    PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
    Pie: ({ data, dataKey, children }: any) => (
      <div data-testid="pie-chart-pie" data-data={JSON.stringify(data)} data-datakey={dataKey}>
        {children}
      </div>
    ),
    Cell: ({ fill }: any) => <div data-testid="pie-chart-cell" data-fill={fill} />,
    Tooltip: () => <div data-testid="pie-chart-tooltip" />,
    Legend: () => <div data-testid="pie-chart-legend" />,
  };
});

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

    // Verify Recharts elements are rendered
    expect(screen.getByTestId('recharts-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    
    const pie = screen.getByTestId('pie-chart-pie');
    expect(pie).toBeInTheDocument();
    expect(pie.getAttribute('data-datakey')).toBe('value');
    
    // Check chart data has emissions split
    const chartData = JSON.parse(pie.getAttribute('data-data') || '[]');
    expect(chartData).toHaveLength(3);
    
    // Transport: 2080, Diet: 2500, Energy: 3600
    expect(chartData[0]).toEqual({ name: 'Transport', value: 2080, color: '#3b82f6' });
    expect(chartData[1]).toEqual({ name: 'Diet', value: 2500, color: '#10b981' });
    expect(chartData[2]).toEqual({ name: 'Energy', value: 3600, color: '#f59e0b' });

    // Check actionable steps are rendered with calculated values
    // Transport savings = 10% of 2080 = 208
    expect(screen.getByText(/Reduce driving by 10% to save ~208 kg CO₂ annually/i)).toBeInTheDocument();
    expect(screen.getByText(/Consider a plant-based meal twice a week to lower dietary impact/i)).toBeInTheDocument();
    expect(screen.getByText(/Switch to LED bulbs and unplug unused appliances/i)).toBeInTheDocument();
  });
});
