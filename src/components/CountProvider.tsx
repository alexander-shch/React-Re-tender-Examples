import { createContext } from 'react';
import { CountContextType } from '../types';

export const CountContext = createContext<CountContextType>({
  count: 0,
  increment: () => {},
});

