import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router"

import './assets/styles/index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import {
  availableItemsSlice,
  currentSelectionSlice,
  currentItemsSlice,
  checkoutSlice,
  socketControl,
} from './services';
import { ProvideAuth } from './services/use-auth';
import { socketMiddleware } from './services/middleware/use-sockets';
import { ORDERS_SOCKET_WSS } from './constants';

const store = configureStore({
  reducer: {
    availableItems: availableItemsSlice.reducer,
    currentSelection: currentSelectionSlice.reducer,
    currentItems: currentItemsSlice.reducer,
    checkout: checkoutSlice.reducer,
    socketControl: socketControl.reducer,
  },
  middleware: (getDefaultMiddleware) => new Tuple(...getDefaultMiddleware(), socketMiddleware(ORDERS_SOCKET_WSS)),
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
