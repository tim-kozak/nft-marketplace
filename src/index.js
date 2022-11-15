import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ui/app';

import './core/di/dependencies';
import { initializeStateManagement } from "./core/state-management/setup";


const root = ReactDOM.createRoot(document.getElementById('root'));
initializeStateManagement();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
