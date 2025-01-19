import { createContext, useContext, useState, useMemo, memo, FC, ReactNode } from 'react';
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

// Split contexts for each field
const NameContext = createContext<string>('');
const EmailContext = createContext<string>('');
const AgeContext = createContext<string>('');
const CountryContext = createContext<string>('');
const FormActionsContext = createContext<FormActions>({
  updateField: () => {},
  resetForm: () => {}
});

const FormProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  
  const actions = useMemo(() => ({
    updateField: (field: keyof FormState, value: string) => {
      setFormState(prev => ({ ...prev, [field]: value }));
    },
    resetForm: () => setFormState(initialState)
  }), []);

  return (
    <NameContext.Provider value={formState.name}>
      <EmailContext.Provider value={formState.email}>
        <AgeContext.Provider value={formState.age}>
          <CountryContext.Provider value={formState.country}>
            <FormActionsContext.Provider value={actions}>
              {children}
            </FormActionsContext.Provider>
          </CountryContext.Provider>
        </AgeContext.Provider>
      </EmailContext.Provider>
    </NameContext.Provider>
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
  const name = useContext(NameContext);
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
  const email = useContext(EmailContext);
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
  const age = useContext(AgeContext);
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
  const country = useContext(CountryContext);
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

// FormSummary component needs all values so we'll pass them individually
const FormSummary = memo(() => {
  const { ref } = useRerenderHook();
  const name = useContext(NameContext);
  const email = useContext(EmailContext);
  const age = useContext(AgeContext);
  const country = useContext(CountryContext);
  
  const formData = useMemo(() => ({
    name,
    email,
    age,
    country
  }), [name, email, age, country]);
  
  return (
    <div ref={ref} style={containerStyle} role="region" aria-label="Form Summary">
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
      <h4>Static Element</h4>
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
        <li>The summary re-renders when any value changes</li>
        <li>The static component never re-renders</li>
        <li>Other fields don't re-render when a single field changes</li>
      </ul>
      <p>
        This is an example of how form state can be split into individual contexts to prevent unnecessary re-renders. Although this is highly inconvenient, it's still a useful technique in some cases.
      </p>

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
const FormContextExampleWrapper: FC = () => (
  <FormProvider>
    <FormContextExample />
  </FormProvider>
);

export default FormContextExampleWrapper;
