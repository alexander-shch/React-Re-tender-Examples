import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContextExample from './pages/ContextExample';
import PropsExample from './pages/PropsExample';
import MemoExample from './pages/MemoExample';
import CallbackExample from './pages/CallbackExample';
import ReduxExample from './pages/ReduxExample';
import OptimizedContextExample from './pages/OptimizedContextExample';
import FormContextExample from './pages/FormContextExample';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/context-example" element={<ContextExample />} />
      <Route path="/optimized-context-example" element={<OptimizedContextExample />} />
      <Route path="/form-context-example" element={<FormContextExample />} />
      <Route path="/redux-example" element={<ReduxExample />} />
      <Route path="/props-example" element={<PropsExample />} />
      <Route path="/memo-example" element={<MemoExample />} />
      <Route path="/callback-example" element={<CallbackExample />} />
    </Routes>
  );
};

export default App;
