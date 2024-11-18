import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthHandler from './components/AuthHandler';
import UserMain from './pages/UserMain';
import HomeTimeline from './components/timelines/HomeTimeline';
import PostConversation from './components/post/PostConversation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage/>}/>
          <Route path="main" element={<UserMain/>}>
            <Route path="home" element={<HomeTimeline/>}></Route>
            <Route path="post/:postId" element={<PostConversation/>}></Route>
          </Route>
        </Route>
        <Route 
          path="/auth/login_callback"
          element={<AuthHandler/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
