import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { containerStyle, buttonStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';
interface ChildProps {
  count?: number;
  text: string;
}

const Child: React.FC<ChildProps> = ({ count, text }) => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>{text}</h4>
      {count !== undefined && <p>Count: {count}</p>}
    </div>
  );
};

const PropsExample: React.FC = () => {
  const { ref } = useRerenderHook();
  const [count, setCount] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  return (
    <div ref={ref} style={containerStyle}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>Props Re-render Example</h2>
      <p>Watch how components highlight in green when they re-render.</p>

      <div style={{ marginBottom: '20px' }}>
        <Child count={count} text="Child with count prop" />
        <Child text="Child without count prop" />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          style={buttonStyle}
          onClick={() => setCount(c => c + 1)}
        >
          Update Count
        </button>
        <button 
          style={buttonStyle}
          onClick={() => setUnrelatedState(s => s + 1)}
        >
          Update Unrelated State ({unrelatedState})
        </button>
      </div>
    </div>
  );
};

export default PropsExample;
