import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css';
import { Provider } from 'react-redux'

import { store } from './redux/store';
import { AuthMiddleWare } from './authMiddleware';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AuthMiddleWare>
            <Router />
          </AuthMiddleWare>
        </BrowserRouter>
      </Provider>
  </React.StrictMode >
);

