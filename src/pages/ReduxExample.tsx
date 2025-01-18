import { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { buttonStyle, containerStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';

// Create a simple counter slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
});

// Configure store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// Regular component - will re-render when parent re-renders
const ParentComponent: FC = () => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h3>Parent Component</h3>
      <ChildA />
      <MemoizedChildA />
      <ChildB />
    </div>
  );
};

// Regular component - will re-render when parent re-renders
const ChildA: FC = () => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child A (No Redux, No Memo)</h4>
      <p>This component won't re-render because it doesn't use Redux</p>
    </div>
  );
};

// Memoized component - won't re-render when parent re-renders
const MemoizedChildA = memo(() => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child A (No Redux, With Memo)</h4>
      <p>This component won't re-render because it's memoized and doesn't use Redux</p>
    </div>
  );
});

const ChildBChild: FC = () => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child B Child (No Redux, No Memo)</h4>
      <p>This component won't re-render because it doesn't use Redux</p>
    </div>
  );
};

// With Redux, this will ONLY re-render when the selected state changes
const ChildB = memo(() => {
  const { ref } = useRerenderHook();
  // useSelector only causes re-render if the selected value changes
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <div ref={ref} style={containerStyle}>
      <h4>Child B (Using Redux, With Memo)</h4>
      <p>Count from Redux: {count}</p>
      <p>This component will ONLY re-render when the selected state changes</p>
      <button 
        style={buttonStyle}
        onClick={() => dispatch(counterSlice.actions.increment())}
      >
        Increment in Child
      </button>
      <ChildBChild />
    </div>
  );
});

const ReduxExample: FC = () => {
  const dispatch = useDispatch();
  const {ref} = useRerenderHook();

  return (
    <div ref={ref} style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>Redux Re-render Example</h2>
      <p>Watch how components highlight in green when they re-render:</p>
      <ul>
        <li>Child A without memo re-renders when parent re-renders</li>
        <li>Child A with memo doesn't re-render at all</li>
        <li>Child B with memo ONLY re-renders when its selected state changes</li>
        <li>Unlike Context, other components using Redux don't re-render!</li>
      </ul>

      <ParentComponent />
      <button 
        style={buttonStyle}
        onClick={() => dispatch(counterSlice.actions.increment())}
      >
        Increment from Parent
      </button>
    </div>
  );
};

// Wrap the example in Provider
const ReduxExampleWrapper: FC = () => (
  <Provider store={store}>
    <ReduxExample />
  </Provider>
);

export default ReduxExampleWrapper;
