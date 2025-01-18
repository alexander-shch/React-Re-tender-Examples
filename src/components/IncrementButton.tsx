import { FC, useContext } from 'react';
import { CountContext } from './CountProvider';

const IncrementButton: FC = () => {
  const { increment } = useContext(CountContext);
  return <button onClick={increment}>+1</button>;
};

export default IncrementButton;
