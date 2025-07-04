import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  availableItemsSlice,
  currentSelectionSlice,
  currentItemsSlice,
} from './services';


const store = configureStore({
  reducer: {
    availableItems: availableItemsSlice.reducer,
    currentSelection: currentSelectionSlice.reducer,
    currentItems: currentItemsSlice.reducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>    
  </React.StrictMode>
);
