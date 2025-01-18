import { screen, fireEvent } from '@testing-library/react';
import MemoExample from '../MemoExample';
import { renderWithRouter } from '../../../test_utils';

describe('MemoExample', () => {
  it('renders without crashing', () => {
    renderWithRouter(<MemoExample />);
    expect(screen.getByText(/React.memo Example/i)).toBeInTheDocument();
  });

  it('increments count when button is clicked', () => {
    renderWithRouter(<MemoExample />);
    const incrementButton = screen.getByText(/Update Count State/i);
    fireEvent.click(incrementButton);
    expect(screen.getByText(/Update Count State \(1\)/i)).toBeInTheDocument();
  });

  it('toggles text when change text button is clicked', () => {
    renderWithRouter(<MemoExample />); 
    const changeTextButton = screen.getByText(/Toggle Text/i);
    fireEvent.click(changeTextButton);
    expect(screen.getAllByText("Hi")[0]).toBeInTheDocument();
    fireEvent.click(changeTextButton);
    expect(screen.getAllByText("Hello")[0]).toBeInTheDocument();
  });

  it('renders regular child with correct text', () => {
    renderWithRouter(<MemoExample />);
    expect(screen.getByText(/Regular Child \(No Memo\)/i)).toBeInTheDocument();
  });

  it('renders memoized child with correct text', () => {
    renderWithRouter(<MemoExample />);
    expect(screen.getByText(/Memoized Child/i)).toBeInTheDocument();
  });
});
