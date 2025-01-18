import React, { createContext, useContext, useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { buttonStyle, containerStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';

interface FormState {
  name: string;
  email: string;
  age: string;
  country: string;
}

interface FormActions {
  updateField: (field: keyof FormState, value: string) => void;
  resetForm: () => void;
}

const initialState: FormState = {
  name: '',
  email: '',
  age: '',
  country: ''
};

// Split contexts for state and actions
const FormStateContext = createContext<FormState>(initialState);
const FormActionsContext = createContext<FormActions>({
  updateField: () => {},
  resetForm: () => {}
});

// Custom hook to select specific parts of the state
const useFormSelector = <T,>(selector: (state: FormState) => T): T => {
  const state = useContext(FormStateContext);
  return useMemo(() => selector(state), [selector, state]);
};

const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  
  const actions = useMemo(() => ({
    updateField: (field: keyof FormState, value: string) => {
      setFormState(prev => ({ ...prev, [field]: value }));
    },
    resetForm: () => setFormState(initialState)
  }), []);

  // Memoize the state to prevent unnecessary re-renders
  const state = useMemo(() => formState, [formState]);
  
  return (
    <FormStateContext.Provider value={state}>
      <FormActionsContext.Provider value={actions}>
        {children}
      </FormActionsContext.Provider>
    </FormStateContext.Provider>
  );
};

const inputStyle = {
  padding: '8px',
  marginBottom: '10px',
  width: '100%',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

// Each field is a separate component that only re-renders when its value changes
const NameField = memo(() => {
  const { ref } = useRerenderHook();
  const name = useFormSelector(state => state.name);
  const { updateField } = useContext(FormActionsContext);

  return (
    <div ref={ref} style={containerStyle}>
      <h4>Name Field</h4>
      <input
        style={inputStyle}
        type="text"
        value={name}
        onChange={e => updateField('name', e.target.value)}
        placeholder="Enter name"
      />
      <p>Current value: {name}</p>
    </div>
  );
});

const EmailField = memo(() => {
  const { ref } = useRerenderHook();
  const email = useFormSelector(state => state.email);
  const { updateField } = useContext(FormActionsContext);

  return (
    <div ref={ref} style={containerStyle}>
      <h4>Email Field</h4>
      <input
        style={inputStyle}
        type="email"
        value={email}
        onChange={e => updateField('email', e.target.value)}
        placeholder="Enter email"
      />
      <p>Current value: {email}</p>
    </div>
  );
});

const AgeField = memo(() => {
  const { ref } = useRerenderHook();
  const age = useFormSelector(state => state.age);
  const { updateField } = useContext(FormActionsContext);

  return (
    <div ref={ref} style={containerStyle}>
      <h4>Age Field</h4>
      <input
        style={inputStyle}
        type="number"
        value={age}
        onChange={e => updateField('age', e.target.value)}
        placeholder="Enter age"
      />
      <p>Current value: {age}</p>
    </div>
  );
});

const CountryField = memo(() => {
  const { ref } = useRerenderHook();
  const country = useFormSelector(state => state.country);
  const { updateField } = useContext(FormActionsContext);

  return (
    <div ref={ref} style={containerStyle}>
      <h4>Country Field</h4>
      <input
        style={inputStyle}
        type="text"
        value={country}
        onChange={e => updateField('country', e.target.value)}
        placeholder="Enter country"
      />
      <p>Current value: {country}</p>
    </div>
  );
});

// FormSummary only re-renders when any field changes since it needs all values
const FormSummary = memo(() => {
  const { ref } = useRerenderHook();
  const formData = useFormSelector(state => state);
  
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Form Summary</h4>
      <pre style={{ background: '#f5f5f5', padding: '10px' }}>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
});

// This component doesn't use any form state, so it never re-renders
const StaticComponent = memo(() => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Static Component</h4>
      <p>This component never re-renders because it doesn't use any form state</p>
    </div>
  );
});

const FormContextExample: React.FC = () => {
  const { ref } = useRerenderHook();
  const { resetForm } = useContext(FormActionsContext);

  return (
    <div ref={ref} style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>Form Context Example</h2>
      <p>Watch how components highlight in green when they re-render:</p>
      <ul>
        <li>Each field component only re-renders when its specific value changes</li>
        <li>The form summary re-renders when any value changes</li>
        <li>The static component never re-renders</li>
        <li>Other fields don't re-render when a single field changes</li>
      </ul>

      <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr', marginTop: '20px' }}>
        <NameField />
        <EmailField />
        <AgeField />
        <CountryField />
      </div>

      <FormSummary />
      <StaticComponent />

      <button 
        style={buttonStyle}
        onClick={resetForm}
      >
        Reset Form
      </button>
    </div>
  );
};

// Wrap the example in Provider
const FormContextExampleWrapper: React.FC = () => (
  <FormProvider>
    <FormContextExample />
  </FormProvider>
);

export default FormContextExampleWrapper;
