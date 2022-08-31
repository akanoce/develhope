import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Router from './router';
import { BrowserRouter } from 'react-router-dom'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);

