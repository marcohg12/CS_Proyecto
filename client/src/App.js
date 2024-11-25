import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthHandler from './components/AuthHandler';
import UserMain from './pages/UserMain';
import HomeTimeline from './components/timelines/HomeTimeline';
import PostConversation from './components/post/PostConversation';
import UserProfile from './components/account/UserProfile';
import PublicTimeline from './components/timelines/PublicTimeline';
import AccountPosts from './components/account/AccountPosts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage/>}/>
          <Route path="main" element={<UserMain/>}>
            <Route path="home" element={<HomeTimeline/>}></Route>
            <Route path="explore" element={<PublicTimeline/>}></Route>
            <Route path="post/:postId" element={<PostConversation/>}></Route>
            <Route path="profile/:userId" element={<UserProfile/>}>
              <Route index element={<AccountPosts/>}></Route>
            </Route>
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
