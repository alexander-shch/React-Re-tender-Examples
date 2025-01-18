import { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { containerStyle, buttonStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';

const DoubleStateSet: FC = () => {
  const { ref } = useRerenderHook();
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(0);

  const increment = () => {
    setCount(c => c + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
    setCount(c => c + 1)
    setCount1(c => c + 1)
    setCount1(c => c + 1)
    setCount1(c => c + 1)
  }

  console.log('DoubleStateSet re-renders', new Date().toLocaleTimeString());

  return (
    <div ref={ref} style={containerStyle}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>Batch state set requests</h2>
      <p>Even tho we update the state multiple times in 1 run, the re-render is triggered only once after the batch requests is finalized</p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          style={buttonStyle}
          onClick={increment}
        >
          Update Count: {count} {count1}
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

export default DoubleStateSet;
