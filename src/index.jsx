import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux';
import './assets/styles/index.css';
import App from './App';
import { ProvideAuth } from './services/use-auth';
import { ORDERS_SOCKET_WSS } from './constants';
import { storeIntegration } from './services/store-integration';

const storeConfig = { wsUrl: ORDERS_SOCKET_WSS }
const store = storeIntegration(storeConfig)

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
