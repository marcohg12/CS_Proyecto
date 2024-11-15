import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthHandler from './components/AuthHandler';
import UserMain from './pages/UserMain';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route 
          path="/main"
          element={<UserMain/>}
        />
        <Route 
          path="/auth/login_callback"
          element={<AuthHandler/>}
        />
        <Route 
          path="/"
          element={<HomePage/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
