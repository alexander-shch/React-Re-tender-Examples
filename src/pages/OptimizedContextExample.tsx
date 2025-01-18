import React, { createContext, useContext, useState, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { buttonStyle, containerStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';

// Split into two contexts: one for state, one for actions
const CountStateContext = createContext<{ count: number }>({ count: 0 });
const CountActionsContext = createContext<{ increment: () => void }>({ increment: () => {} });

// Custom hook to select specific parts of the state
const useCountSelector = <T,>(selector: (state: { count: number }) => T) => {
  const state = useContext(CountStateContext);
  return useMemo(() => selector(state), [selector, state]);
};

// Provider component that splits state and actions
const OptimizedCountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  
  // Memoize the increment function
  const actions = useMemo(() => ({
    increment: () => setCount(c => c + 1)
  }), []);

  // Memoize the state object
  const state = useMemo(() => ({ count }), [count]);
  
  return (
    <CountStateContext.Provider value={state}>
      <CountActionsContext.Provider value={actions}>
        {children}
      </CountActionsContext.Provider>
    </CountStateContext.Provider>
  );
};

const ParentComponent: React.FC = () => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h3>Parent Component</h3>
      <ChildA />
      <ChildB />
      <ChildBChild />
    </div>
  );
};

const ChildA = memo(() => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child A (No Context)</h4>
      <p>This component won't re-render because it doesn't use context</p>
    </div>
  );
});

const ChildBChild = () => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child B Child (No Context)</h4>
      <p>This component will re-render because its parent uses context</p>
    </div>
  );
};

const ChildBChildMemo = memo(() => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child B Child (With Memo)(No Context)</h4>
      <p>This component won't re-render even though its parent uses context</p>
    </div>
  );
});

const ChildB = memo(() => {
  const { ref } = useRerenderHook();
  // Only select the specific piece of state needed
  const count = useCountSelector(state => state.count);
  const { increment } = useContext(CountActionsContext);
  
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child B (Using Optimized Context)</h4>
      <p>Count from context: {count}</p>
      <p>This component will ONLY re-render when count changes</p>
      <button 
        style={buttonStyle}
        onClick={increment}
      >
        Increment in Child
      </button>
      <ChildBChild />
      <ChildBChildMemo />
    </div>
  );
});

const OptimizedContextExample: React.FC = () => {
  const { ref } = useRerenderHook();
  const { increment } = useContext(CountActionsContext);

  return (
    <div ref={ref} style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>Optimized Context Re-render Example</h2>
      <p>Watch how components highlight in green when they re-render:</p>
      <ul>
        <li>Context is split into state and actions to prevent unnecessary re-renders</li>
        <li>Components only re-render when their selected state changes</li>
        <li>Child components don't re-render unless they use context</li>
        <li>This behaves similarly to Redux!</li>
      </ul>

      <ParentComponent />
      <button 
        style={buttonStyle}
        onClick={increment}
      >
        Increment from Parent
      </button>
    </div>
  );
};

// Wrap the example in Provider
const OptimizedContextExampleWrapper: React.FC = () => (
  <OptimizedCountProvider>
    <OptimizedContextExample />
  </OptimizedCountProvider>
);

export default OptimizedContextExampleWrapper;
