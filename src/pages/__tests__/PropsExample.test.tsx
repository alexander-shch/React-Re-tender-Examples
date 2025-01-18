import { screen, fireEvent } from '@testing-library/react';
import PropsExample from '../PropsExample';
import { renderWithRouter } from '../../../test_utils';

describe('PropsExample', () => {
  it('renders both child components', () => {
    renderWithRouter(<PropsExample />);
    expect(screen.getByText('Child with count prop')).toBeInTheDocument();
    expect(screen.getByText('Child without count prop')).toBeInTheDocument();
  });

  it('updates count when Update Count button is clicked', () => {
    renderWithRouter(<PropsExample />);
    const updateCountButton = screen.getByText('Update Count');
    
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    fireEvent.click(updateCountButton);
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('updates unrelated state counter', () => {
    renderWithRouter(<PropsExample />);
    const unrelatedStateButton = screen.getByText(/Update Unrelated State/);
    
    expect(screen.getByText(/Update Unrelated State \(0\)/)).toBeInTheDocument();
    fireEvent.click(unrelatedStateButton);
    expect(screen.getByText(/Update Unrelated State \(1\)/)).toBeInTheDocument();
  });

  it('renders the explanation text', () => {
    renderWithRouter(<PropsExample />);
    expect(screen.getByText(/Watch how components highlight in green when they re-render/i)).toBeInTheDocument();
  });
});
