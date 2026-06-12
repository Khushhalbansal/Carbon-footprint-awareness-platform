import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FootprintProvider, useFootprint } from './FootprintContext';

// Helper component to test context
const TestComponent = () => {
  const { data, emissions, updateData } = useFootprint();

  return (
    <div>
      <div data-testid="transport">{data.transport}</div>
      <div data-testid="diet">{data.diet}</div>
      <div data-testid="energy">{data.energy}</div>
      
      <div data-testid="emissions-transport">{emissions.transport}</div>
      <div data-testid="emissions-diet">{emissions.diet}</div>
      <div data-testid="emissions-energy">{emissions.energy}</div>
      <div data-testid="emissions-total">{emissions.total}</div>
      
      <button 
        data-testid="update-btn" 
        onClick={() => updateData({ transport: 200, diet: 'vegan', energy: 50 })}
      >
        Update
      </button>
    </div>
  );
};

describe('FootprintContext & Emissions Calculation', () => {
  it('should provide default values and correct initial calculations', () => {
    render(
      <FootprintProvider>
        <TestComponent />
      </FootprintProvider>
    );

    // Default values check
    expect(screen.getByTestId('transport').textContent).toBe('100');
    expect(screen.getByTestId('diet').textContent).toBe('omnivore');
    expect(screen.getByTestId('energy').textContent).toBe('100');

    // Calculations:
    // Transport = 100 * 0.4 * 52 = 2080
    // Diet (omnivore) = 2500
    // Energy = 100 * 3 * 12 = 3600
    // Total = 8180
    expect(screen.getByTestId('emissions-transport').textContent).toBe('2080');
    expect(screen.getByTestId('emissions-diet').textContent).toBe('2500');
    expect(screen.getByTestId('emissions-energy').textContent).toBe('3600');
    expect(screen.getByTestId('emissions-total').textContent).toBe('8180');
  });

  it('should update emissions correctly when data is modified', () => {
    render(
      <FootprintProvider>
        <TestComponent />
      </FootprintProvider>
    );

    // Perform update
    act(() => {
      fireEvent.click(screen.getByTestId('update-btn'));
    });

    // Updated values check
    expect(screen.getByTestId('transport').textContent).toBe('200');
    expect(screen.getByTestId('diet').textContent).toBe('vegan');
    expect(screen.getByTestId('energy').textContent).toBe('50');

    // New Calculations:
    // Transport = 200 * 0.4 * 52 = 4160
    // Diet (vegan) = 1500
    // Energy = 50 * 3 * 12 = 1800
    // Total = 4160 + 1500 + 1800 = 7460
    expect(screen.getByTestId('emissions-transport').textContent).toBe('4160');
    expect(screen.getByTestId('emissions-diet').textContent).toBe('1500');
    expect(screen.getByTestId('emissions-energy').textContent).toBe('1800');
    expect(screen.getByTestId('emissions-total').textContent).toBe('7460');
  });
});
