import { screen, fireEvent } from '@testing-library/react';
import FormContextExample from '../FormContextExample';
import { renderWithRouter } from '../../../test_utils';

describe('FormContextExample', () => {
  it('renders without crashing', () => {
    renderWithRouter(<FormContextExample />);
    expect(screen.getByText(/Form Context Example/i)).toBeInTheDocument();
  });

  it('renders all child components', () => {
    renderWithRouter(<FormContextExample />);
    expect(screen.getByText("Name Field")).toBeInTheDocument();
    expect(screen.getByText("Email Field")).toBeInTheDocument();
    expect(screen.getByText("Age Field")).toBeInTheDocument();
    expect(screen.getByText("Country Field")).toBeInTheDocument();
    expect(screen.getByText("Form Summary")).toBeInTheDocument();
    expect(screen.getByText("Static Element")).toBeInTheDocument();
  });

  it('updates form fields correctly', () => {
    renderWithRouter(<FormContextExample />);
    
    // Test name field
    const nameField = screen.getByPlaceholderText(/Enter name/i);
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    expect(screen.getByText(/Current value: John Doe/i)).toBeInTheDocument();
    
    // Test email field
    const emailField = screen.getByPlaceholderText(/Enter email/i);
    fireEvent.change(emailField, { target: { value: 'john@example.com' } });
    expect(screen.getByText(/Current value: john@example.com/i)).toBeInTheDocument();
    
    // Test age field
    const ageField = screen.getByPlaceholderText(/Enter age/i);
    fireEvent.change(ageField, { target: { value: '25' } });
    expect(screen.getByText(/Current value: 25/i)).toBeInTheDocument();
    
    // Test country field
    const countryField = screen.getByPlaceholderText(/Enter country/i);
    fireEvent.change(countryField, { target: { value: 'USA' } });
    expect(screen.getByText(/Current value: USA/i)).toBeInTheDocument();
  });

  it('updates form summary when fields change', () => {
    renderWithRouter(<FormContextExample />);
    
    const nameField = screen.getByPlaceholderText(/Enter name/i);
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    
    const formSummarySection = screen.getByRole('region', { name: /form summary/i });
    expect(formSummarySection).toHaveTextContent(/John Doe/);
  });

  it('resets the form when the reset button is clicked', () => {
    renderWithRouter(<FormContextExample />);
    
    // Fill out all fields
    const nameField = screen.getByPlaceholderText(/Enter name/i);
    const emailField = screen.getByPlaceholderText(/Enter email/i);
    const ageField = screen.getByPlaceholderText(/Enter age/i);
    const countryField = screen.getByPlaceholderText(/Enter country/i);

    fireEvent.change(nameField, { target: { value: 'Test Name' } });
    fireEvent.change(emailField, { target: { value: 'test@email.com' } });
    fireEvent.change(ageField, { target: { value: '30' } });
    fireEvent.change(countryField, { target: { value: 'Test Country' } });

    // Click reset button
    const resetButton = screen.getByText(/Reset Form/i);
    fireEvent.click(resetButton);

    // Verify all fields are reset
    expect(nameField).toHaveValue('');
    expect(emailField).toHaveValue('');
    expect(ageField).toHaveValue(null);
    expect(countryField).toHaveValue('');
  });

  it('displays correct initial empty state in form summary', () => {
    renderWithRouter(<FormContextExample />);
    const formSummarySection = screen.getByRole('region', { name: /form summary/i });
    expect(formSummarySection).toHaveTextContent(/"name": ""/);
    expect(formSummarySection).toHaveTextContent(/"email": ""/);
    expect(formSummarySection).toHaveTextContent(/"age": ""/);
    expect(formSummarySection).toHaveTextContent(/"country": ""/);
  });
});
