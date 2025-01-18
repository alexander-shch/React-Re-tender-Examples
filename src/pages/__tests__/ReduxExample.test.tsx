import { screen, fireEvent } from '@testing-library/react';
import ReduxExample from '../ReduxExample';
import { renderWithRouter } from '../../../test_utils';

describe('ReduxExample', () => {
  it('renders all child components', () => {
    renderWithRouter(<ReduxExample />);
    expect(screen.getByText('Child A (No Redux, No Memo)')).toBeInTheDocument();
    expect(screen.getByText('Child A (No Redux, With Memo)')).toBeInTheDocument();
    expect(screen.getByText('Child B Child (No Redux, No Memo)')).toBeInTheDocument();
  });

  it('updates count when increment button is clicked', () => {
    renderWithRouter(<ReduxExample />);
    expect(screen.getByText(/Count from Redux: 0/i)).toBeInTheDocument();
    
    const incrementButton = screen.getByText('Increment in Child');
    fireEvent.click(incrementButton);
    
    expect(screen.getByText(/Count from Redux: 1/i)).toBeInTheDocument();
  });

  it('displays initial count state', () => {
    renderWithRouter(<ReduxExample />);
    expect(screen.getAllByText(/Count from Redux: 1/i).length).toEqual(1);
  });

  it('renders explanation texts for each component', () => {
    renderWithRouter(<ReduxExample />);
    expect(screen.getAllByText(/This component will ONLY re-render when the selected state changes/i).length).toEqual(1);
    expect(screen.getAllByText(/This component won't re-render because it doesn't use Redux/i).length).toEqual(2);
  });

  it('renders the Redux example title', () => {
    renderWithRouter(<ReduxExample />);
    expect(screen.getByText('Redux Re-render Example')).toBeInTheDocument();
  });

  it('increment from parent', () => {
    renderWithRouter(<ReduxExample />);
    const buttonIncrement = screen.getByText('Increment from Parent');
    fireEvent.click(buttonIncrement);
    expect(screen.getByText(/Count from Redux: 2/i)).toBeInTheDocument();
  })
  
});
