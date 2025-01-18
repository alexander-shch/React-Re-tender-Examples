import React, { createContext, useContext, useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { buttonStyle, containerStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';

const CountContext = createContext({ count: 0, setCount: (n: number) => {} });

// Regular component - will re-render when parent re-renders
const ParentComponent: React.FC = () => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h3>Parent Component</h3>
      <ChildA />
      <MemoizedChildB />
      <ChildC />
    </div>
  );
};

// Regular component - will re-render when parent re-renders
const ChildA: React.FC = () => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child A (No Context, No Memo)</h4>
      <p>This component will re-render because its parent re-renders</p>
    </div>
  );
};

// Memoized component - won't re-render when parent re-renders
const MemoizedChildB = memo(() => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child B (No Context, With Memo)</h4>
      <p>This component won't re-render because it's memoized and doesn't use context</p>
    </div>
  );
});

// Even with memo, this will re-render when context changes
const ChildC = memo(() => {
  const { count } = useContext(CountContext);
  const { ref } = useRerenderHook();
  
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child B (Using Context, With Memo)</h4>
      <p>Count from context: {count}</p>
      <p>This component will re-render when context changes, even though it's memoized</p>
    </div>
  );
});

const ContextExample: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>Context Re-render Example</h2>
      <p>Watch how components highlight in green when they re-render:</p>
      <ul>
        <li>Child A without memo re-renders when parent re-renders</li>
        <li>Child A with memo doesn't re-render at all</li>
        <li>Child B with memo still re-renders when context changes</li>
      </ul>
      
      <CountContext.Provider value={{ count, setCount }}>
        <ParentComponent />
        <button 
          style={buttonStyle}
          onClick={() => setCount(c => c + 1)}
        >
          Increment Count
        </button>
      </CountContext.Provider>
    </div>
  );
};

export default ContextExample;
