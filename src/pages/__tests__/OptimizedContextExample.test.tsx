import { screen, fireEvent } from '@testing-library/react';
import OptimizedContextExample from '../OptimizedContextExample';
import { renderWithRouter } from '../../../test_utils';

describe('OptimizedContextExample', () => {
  it('renders all child components', () => {
    renderWithRouter(<OptimizedContextExample />);
    expect(screen.getByText('Child A (No Context)')).toBeInTheDocument();
    expect(screen.getByText('Child B (Using Optimized Context)')).toBeInTheDocument();
    expect(screen.getAllByText('Child B Child (No Context)')).toHaveLength(2);
    expect(screen.getByText('Child B Child (With Memo)(No Context)')).toBeInTheDocument();
  });

  it('updates count when increment button is clicked', () => {
    renderWithRouter(<OptimizedContextExample />);
    expect(screen.getByText(/Count from context: 0/i)).toBeInTheDocument();
    
    const incrementButton = screen.getByText('Increment in Child');
    fireEvent.click(incrementButton);
    
    expect(screen.getByText(/Count from context: 1/i)).toBeInTheDocument();
  });

  it('displays initial count state', () => {
    renderWithRouter(<OptimizedContextExample />);
    expect(screen.getByText(/Count from context: 0/i)).toBeInTheDocument();
  });

  it('renders explanation texts for each component', () => {
    renderWithRouter(<OptimizedContextExample />);
    expect(screen.getByText(/This component won't re-render because it doesn't use context/i)).toBeInTheDocument();
    expect(screen.getByText(/This component will ONLY re-render when count changes/i)).toBeInTheDocument();
    expect(screen.getAllByText(/This component will re-render because its parent uses context/i)).toHaveLength(2);
    expect(screen.getByText(/This component won't re-render even though its parent uses context/i)).toBeInTheDocument();
  });
});
