import { FC } from 'react';
import CountDisplay from './CountDisplay';
import IncrementButton from './IncrementButton';

const NestedComponent: FC = () => {
  return (
    <div>
      <h1>Nested Component Example</h1>
      <CountDisplay />
      <IncrementButton />
    </div>
  );
};

export default NestedComponent;
