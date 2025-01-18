import React, { createContext, useState } from 'react';
import { CountContextType, CountProviderProps } from '../types';

export const CountContext = createContext<CountContextType>({
  count: 0,
  increment: () => {},
});

const CountProvider: React.FC<CountProviderProps> = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);

  return (
    <CountContext.Provider value={{ count, increment }}>
      {children}
    </CountContext.Provider>
  );
};

export default CountProvider;
