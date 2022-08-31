import Container from 'components/container';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import Router from 'router';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Container>
        <Router />
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);

