import React from 'react';
import CountDisplay from './CountDisplay';
import IncrementButton from './IncrementButton';

const NestedComponent: React.FC = () => {
  return (
    <div>
      <h1>Nested Component Example</h1>
      <CountDisplay />
      <IncrementButton />
    </div>
  );
};

export default NestedComponent;
