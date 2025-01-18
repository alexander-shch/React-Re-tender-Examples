import React, { useContext } from 'react';
import { CountContext } from './CountProvider';

const IncrementButton: React.FC = () => {
  const { increment } = useContext(CountContext);
  return <button onClick={increment}>+1</button>;
};

export default IncrementButton;
