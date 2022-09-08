import Container from 'components/container';
import { CartContextProvider } from 'context/cartContext';
import { DataContextProvider } from 'context/dataContext';
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
      <DataContextProvider>
        <CartContextProvider>
          <Container>
            <Router />
          </Container>
        </CartContextProvider>
      </DataContextProvider>
    </BrowserRouter>
  </React.StrictMode >
);

