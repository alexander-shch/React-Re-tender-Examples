export interface CountContextType {
  count: number;
  increment: () => void;
}

export interface CountProviderProps {
  children: React.ReactNode;
}
