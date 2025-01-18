import { screen, fireEvent } from '@testing-library/react';
import CallbackExample from '../CallbackExample';
import { renderWithRouter } from '../../../test_utils';

describe('CallbackExample', () => {
  it('renders without crashing', () => {
    renderWithRouter(<CallbackExample />);
    expect(screen.getByText(/useCallback Example/i)).toBeInTheDocument();
    expect(screen.getByText(/Regular Count: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Callback Count: 0/i)).toBeInTheDocument();
  });

  it('increments count A when RegularButton is clicked', () => {
    renderWithRouter(<CallbackExample />);
    const buttonA = screen.getByText(/Regular Count: 0/i);
    fireEvent.click(buttonA);
    expect(screen.getByText(/Regular Count: 1/i)).toBeInTheDocument();
  });

  it('increments count B when CallbackButton is clicked', () => {
    renderWithRouter(<CallbackExample />);
    const buttonB = screen.getByText(/Callback Count: 0/i); 
    fireEvent.click(buttonB);
    expect(screen.getByText(/Callback Count: 1/i)).toBeInTheDocument();
  });

  it('updates unrelated state without affecting counts', () => {
    renderWithRouter(<CallbackExample />);
    const unrelatedButton = screen.getByText(/Update Unrelated State/i);
    fireEvent.click(unrelatedButton);
    expect(screen.getByText(/Regular Count: 0/i)).toBeInTheDocument();
    expect(screen.getByText(/Callback Count: 0/i)).toBeInTheDocument();
  });
});
