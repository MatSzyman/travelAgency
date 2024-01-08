import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/modern-normalize.css';
import './styles/style.css'
import './styles/utils.css'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);