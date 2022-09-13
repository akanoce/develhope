import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Router from './router';
import { BrowserRouter } from 'react-router-dom'
import { Container } from './components/layout';
import { DataContextProvider } from './context/dataContext';
import { CartContextProvider } from './context/cartContext';


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
  </React.StrictMode>
);

