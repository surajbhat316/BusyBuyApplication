import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './context/AuthContext';
import CartContextProvider from './context/CartContext';

import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <CartContextProvider>
        {/* <HashRouter> */}
          <App />
        {/* </HashRouter> */}
      </CartContextProvider>
    </AuthProvider>
  // </React.StrictMode>
);
