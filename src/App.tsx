import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContextExample from './pages/ContextExample';
import PropsExample from './pages/PropsExample';
import MemoExample from './pages/MemoExample';
import CallbackExample from './pages/CallbackExample';
import ReduxExample from './pages/ReduxExample';
import OptimizedContextExample from './pages/OptimizedContextExample';
import FormContextExample from './pages/FormContextExample';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import DoubleStateSet from './pages/DoubleStateSet';

// Create a simple counter slice
const userSlice = createSlice({
  name: 'user',
  initialState: { name: 'Alex', lastName: 'Doe', age: 16 },
  reducers: {},
});

// Configure store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

const App: FC = () => {

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/context-example" element={<ContextExample />} />
        <Route path="/optimized-context-example" element={<OptimizedContextExample />} />
        <Route path="/form-context-example" element={<FormContextExample />} />
        <Route path="/redux-example" element={<ReduxExample />} />
        <Route path="/props-example" element={<PropsExample />} />
        <Route path="/memo-example" element={<MemoExample />} />
        <Route path="/double-state-set" element={<DoubleStateSet />} />
        <Route path="/callback-example" element={<CallbackExample />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Provider>
  );
};

export default App;
