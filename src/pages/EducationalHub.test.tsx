import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { EducationalHub } from './EducationalHub';

describe('EducationalHub Page', () => {
  it('renders educational content sections', () => {
    render(
      <MemoryRouter>
        <EducationalHub />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Understanding Your Carbon Footprint')).toBeInTheDocument();
    expect(screen.getByText('What is a Carbon Footprint?')).toBeInTheDocument();
    expect(screen.getByText('The Impact of Diet')).toBeInTheDocument();
    expect(screen.getByText('Transportation Matters')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Calculate Your Footprint Now/i })).toHaveAttribute('href', '/calculator');
  });
});
