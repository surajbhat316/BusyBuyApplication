import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './context/AuthContext';
import CartContextProvider from './context/CartContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <AuthProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </AuthProvider>
  // </React.StrictMode>
);
