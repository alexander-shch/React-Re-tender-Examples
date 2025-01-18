import { useState, useCallback, memo, FC } from 'react';
import { Link } from 'react-router-dom';
import { containerStyle, buttonStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const RegularButton = memo<ButtonProps>(({ onClick, label }) => {
  
  const { ref } = useRerenderHook();

  return (
    <div ref={ref} style={containerStyle}>
      <h4>Regular Button (with memo)</h4>
      <button style={buttonStyle} onClick={onClick}>{label}</button>
    </div>
  );
});

const CallbackButton = memo<ButtonProps>(({ onClick, label }) => {
  
  const { ref } = useRerenderHook();

  return (
    <div ref={ref} style={containerStyle}>
      <h4>Button with useCallback</h4>
      <button style={buttonStyle} onClick={onClick}>{label}</button>
    </div>
  );
});

const CallbackExample: FC = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Regular function - recreated on every render
  const incrementA = () => setCountA(c => c + 1);
  
  // Memoized callback - only created once
  const incrementB = useCallback(() => setCountB(c => c + 1), []);

  return (
    <div style={containerStyle}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>useCallback Example</h2>
      <p>Watch how components highlight in green when they re-render.</p>

      <div style={{ marginBottom: '20px' }}>
        <RegularButton onClick={incrementA} label={`Regular Count: ${countA}`} />
        <CallbackButton onClick={incrementB} label={`Callback Count: ${countB}`} />
      </div>

      <button 
        style={buttonStyle}
        onClick={() => setUnrelatedState(s => s + 1)}
      >
        Update Unrelated State ({unrelatedState})
      </button>
    </div>
  );
};

export default CallbackExample;
