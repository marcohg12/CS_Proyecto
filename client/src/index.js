import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertProvider } from './components/AlertContext';
import { TimelineProvider } from './components/TimelineContex';
import { UserProvider } from './components/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <AlertProvider>
    <UserProvider>
      <TimelineProvider>
        <App />
      </TimelineProvider>
    </UserProvider>
  </AlertProvider>
  //</React.StrictMode>
);

