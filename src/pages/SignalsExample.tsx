import { FC } from 'react';
import { signal, computed } from '@preact/signals-react';
import { containerStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';
import { useSignals } from '@preact/signals-react/runtime';
import { Link } from 'react-router-dom';

const count = signal(0);
const doubleCount = computed(() => count.value * 2);

function CounterWithValue() {
  const { ref } = useRerenderHook();
  useSignals()

  console.log('Counter re-renders', new Date().toLocaleTimeString());

  const increment = () => {
    count.value++;
  }

  return (
    <div ref={ref} style={containerStyle}>
      <h3>Counter Component</h3>
      <p>The component re-renders every time the Signal count value changes because we added useSignal watcher</p>
      <p>and we use <code>count.value</code> from the signal</p>
      <p>Count: {count.value}</p>
      <button onClick={increment}>click me</button>
    </div>
  );
}

function CounterWithoutValue() {
  const { ref } = useRerenderHook();
  useSignals()

  console.log('Counter re-renders', new Date().toLocaleTimeString());

  const increment = () => {
    // A signal is updated by assigning to the `.value` property:
    count.value++;
  }

  return (
    <div ref={ref} style={containerStyle}>
      <h3>Counter Component</h3>
      <p>The component will not re-renders every time count changes even with useSignal</p>
      <p>Because we use <code>count</code> directly which creates a subscription</p>
      <p>Count: {count}</p>
      <button onClick={increment}>click me</button>
    </div>
  );
}

const DisplayCount: FC = () => {
  const { ref } = useRerenderHook();

  console.log('DisplayCount re-renders', new Date().toLocaleTimeString());
  
  return (
    <div ref={ref} style={containerStyle}>
      <h3>Display Component with computed (No re-render)</h3>
      <p>Current Count: {count}</p>
      <p>Current Count Double: {doubleCount}</p>
    </div>
  );
};

const SignalsExample: FC = () => {
  const { ref } = useRerenderHook();

  console.log('SignalsExample re-renders', new Date().toLocaleTimeString());
  
  return (
    <div ref={ref} style={containerStyle}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      <h2>Preact Signals Example</h2>
      <p>
        This example demonstrates how Preact Signals work for state management.
        Notice how components only re-render when their used signals change.
      </p>
      <p>We can also prevent any re-render effect using signals, depends on how we use them</p>
      <CounterWithoutValue />
      <CounterWithValue />
      <DisplayCount />
    </div>
  );
};

export default SignalsExample;
