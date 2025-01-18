import { useState, memo, FC } from 'react';
import { Link } from 'react-router-dom';
import { containerStyle, buttonStyle, navButtonStyle } from '../styles';
import { useRerenderHook } from '../hooks/rerenderHook';

interface ChildProps {
  text: string;
}

const RegularChild: FC<ChildProps> = ({ text }) => {  
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} id='regular' style={containerStyle}>
      <h4>Regular Child (No Memo)</h4>
      <p>{text}</p>
    </div>
  );
};

const MemoizedChild = memo<ChildProps>(({ text }) => {
  const { ref } = useRerenderHook();
  return (
    <div ref={ref} style={containerStyle} id='memoized'>
      <h4>Memoized Child</h4>
      <p>{text}</p>
    </div>
  );
});

const MemoExample: FC = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('Hello');

  return (
    <div style={containerStyle}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={navButtonStyle}>Back to Home</button>
      </Link>
      
      <h2>React.memo Example</h2>
      <p>Watch how components highlight in green when they re-render.</p>

      <div style={{ marginBottom: '20px' }}>
        <RegularChild text={text} />
        <MemoizedChild text={text} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          style={buttonStyle}
          onClick={() => setCount(c => c + 1)}
        >
          Update Count State ({count})
        </button>
        <button 
          style={buttonStyle}
          onClick={() => setText(t => t === 'Hello' ? 'Hi' : 'Hello')}
        >
          Toggle Text
        </button>
      </div>
    </div>
  );
};

export default MemoExample;
