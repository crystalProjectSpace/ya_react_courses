import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router"

import './assets/styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  availableItemsSlice,
  currentSelectionSlice,
  currentItemsSlice,
  checkoutSlice,
} from './services';
import { ProvideAuth } from './services/use-auth';


const store = configureStore({
  reducer: {
    availableItems: availableItemsSlice.reducer,
    currentSelection: currentSelectionSlice.reducer,
    currentItems: currentItemsSlice.reducer,
    checkout: checkoutSlice.reducer,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProvideAuth>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>        
      </Provider>    
    </React.StrictMode>
  </ProvideAuth>
);
