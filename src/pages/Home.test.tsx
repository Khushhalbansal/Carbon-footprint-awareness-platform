import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from './Home';

describe('Home Page', () => {
  it('renders the hero section with call to action', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Measure. Understand. Reduce./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start calculating your footprint/i })).toBeInTheDocument();
  });
});
