import { fireEvent, screen } from '@testing-library/react';
import ContextExample from '../ContextExample';
import { renderWithRouter } from '../../../test_utils';

describe('ContextExample', () => {
  it('renders without crashing', () => {
    renderWithRouter(<ContextExample />);
    expect(screen.getByText(/Context Re-render Example/i)).toBeInTheDocument();
  });

  // Add more tests for the functionalities of ContextExample
  it('renders all child components', () => {
    renderWithRouter(<ContextExample />);
    expect(screen.getByText("Child A (No Context, No Memo)")).toBeInTheDocument();
    expect(screen.getByText("Child B (No Context, With Memo)")).toBeInTheDocument();
    expect(screen.getByText("Child B (Using Context, With Memo)")).toBeInTheDocument();
  });

  it('increments count when button is clicked', () => {
    renderWithRouter(<ContextExample />);
    const incrementButton = screen.getByText(/Increment Count/i);
    expect(screen.getByText(/Count from context: 0/i)).toBeInTheDocument();
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Count from context: 1/i)).toBeInTheDocument();
  });

  it('updates context in child component', () => {
    renderWithRouter(<ContextExample />);
    const initialCount = screen.getByText(/Count from context: 0/i);
    expect(initialCount).toBeInTheDocument();
    const incrementButton = screen.getByText(/Increment Count/i);
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Count from context: 1/i)).toBeInTheDocument();
  });

});
