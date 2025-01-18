import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { containerStyle, navButtonStyle } from '../styles';

const examples = [
  { path: '/props-example', name: 'Props Updates Example' },
  { path: '/memo-example', name: 'React.memo Usage Example' },
  { path: '/callback-example', name: 'useCallback Example' },
  { path: '/context-example', name: 'Context Re-renders Example' },
  { path: '/optimized-context-example', name: 'Optimized Context Example' },
  { path: '/form-context-example', name: 'Form Context Example' },
  { path: '/redux-example', name: 'Redux Re-renders Example' },
];

const HomePage: FC = () => {
  return (
    <div style={containerStyle}>
      <h1>React Re-render Examples</h1>
      <p>Select an example to see how React components re-render in different scenarios.</p>
      <p>Each example will highlight components in green when they re-render!</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
        {examples.map((example) => (
          <Link 
            key={example.path}
            to={example.path}
            style={{ textDecoration: 'none' }}
          >
            <button style={navButtonStyle}>
              {example.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
