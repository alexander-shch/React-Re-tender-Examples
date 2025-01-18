import { FC, useContext } from 'react';
import { CountContext } from './CountProvider';

const CountDisplay: FC = () => {
  const { count } = useContext(CountContext);
  return <h2>Current Count: {count}</h2>;
};

export default CountDisplay;
