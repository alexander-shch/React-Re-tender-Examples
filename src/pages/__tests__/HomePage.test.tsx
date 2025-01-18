import { screen } from '@testing-library/react';
import HomePage from '../HomePage';
import { renderWithRouter } from '../../../test_utils';

describe('HomePage', () => {
  it('renders the homepage title', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('React Re-render Examples')).toBeInTheDocument();
  });

  it('renders all example navigation links', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText('Props Updates Example')).toBeInTheDocument();
    expect(screen.getByText('React.memo Usage Example')).toBeInTheDocument();
    expect(screen.getByText('useCallback Example')).toBeInTheDocument();
    expect(screen.getByText('Context Re-renders Example')).toBeInTheDocument();
    expect(screen.getByText('Optimized Context Example')).toBeInTheDocument();
    expect(screen.getByText('Form Context Example')).toBeInTheDocument();
    expect(screen.getByText('Redux Re-renders Example')).toBeInTheDocument();
  });

  it('renders description text', () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText(/Select an example to see how React components re-render/i)).toBeInTheDocument();
    expect(screen.getByText(/Each example will highlight components in green/i)).toBeInTheDocument();
  });
});
