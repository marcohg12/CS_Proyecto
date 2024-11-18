import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertProvider } from './providers/AlertContext';
import { UserProvider } from './providers/UserContext';
import { HomeTimelineProvider } from './providers/HomeTimelineContext';
import { PublicTimelineProvider } from './providers/PublicTimelineContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
  <AlertProvider>
    <PublicTimelineProvider>
      <UserProvider>
        <HomeTimelineProvider>
          <App />
        </HomeTimelineProvider>
      </UserProvider>
    </PublicTimelineProvider>
  </AlertProvider>
  //</React.StrictMode>
);

